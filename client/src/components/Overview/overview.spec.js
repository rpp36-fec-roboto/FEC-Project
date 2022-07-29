/**
 * @jest-environment jsdom
 */

// import dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';

// import test environment and methds
import '@testing-library/jest-dom'; // provides method for DOM matcher
import { render, screen, waitFor, within, cleanup, fireEvent } from '@testing-library/react'; // provides methods to test element rendering and user event
import userEvent from '@testing-library/user-event'; // provide method to trigger user activity
// import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import { act } from "react-dom/test-utils";

// import API mocking utilities from Mock Service Worker
import mockServer from '../../mockFiles/mockServer.js';

// add components to test
import sampleData from '../../mockFiles/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';
import App from '../../App.jsx';
import Overview from './Overview.jsx';
import Cart from './Cart.jsx';


///////////////////////////////////
//---------- TEST SETUP ---------//
///////////////////////////////////

// mock add/remove yourOutfit handler at local level
var yourOutfit = [];
const addToYourOutfit = (productId) => {
  yourOutfit.push(productId);
}
const removeFromYourOutfit = (productId) => {
  yourOutfit.splice(yourOutfit.indexOf(productId), 1);
}

// establish API mocking before all tests
beforeAll(() => mockServer.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => mockServer.resetHandlers());
// clean up once the tests are done
afterAll(() => mockServer.close());


///////////////////////////////////
//---------- UNIT TEST ----------//
///////////////////////////////////

describe('helper function unit tests', () => {
  it('should calculate average rating', () => {
    expect(helper.calculateRating(sampleData.reviewsMeta.ratings)).toBe('72%');
  });

  it('should return false when quantity of all skus in a style is 0', () => {
    expect(helper.inStock(sampleData.invalidDataset.results[0].skus)).toBe(false);
  });
});

describe('Component render with invalid dataset', () => {
  beforeEach(() => {
    render(<Cart
      currentStyle={sampleData.invalidDataset.results[0]}
      selectedSize={'Select Size'}
      selectedQuant={0}
      isYourOutfit={true}
      handleSelect={() => {}}
      submitCartRequest={() => {}}
      handleAddToYourOutfit={addToYourOutfit}
      handleRemoveFromYourOutfit={removeFromYourOutfit}
      />)
  })

  it('should show out of stock in size selector and disable selector', () => {
    const sizeSelector = screen.getByRole('option', {name: 'OUT OF STOCK'});
    expect(sizeSelector).toBeInTheDocument();
    expect(sizeSelector).toBeDisabled();
  });
  it('should have quantity selector disabled', () => {
    expect(screen.getByRole('option', {name: '-'})).toBeDisabled();
  });
  it('should not have a add to cart button', () => {
    expect(screen.queryByRole('button', {name: /ADD TO CART/i})).not.toBeInTheDocument();
  });
});

///////////////////////////////////
//------ INTEGRATION TEST -------//
///////////////////////////////////

/**
 * Rendering the whole component to conduct static rendering tests may not be ideal.
 * Chose to do so to avoid mocking data and function that passed to each component.
 * Disadvantage: slow test running; not modularized
 */

describe('Overview widget rendering', () => {
  /**
   * React testing library inject global afterEach cleanup to Jest framework.
   * Therefore, no need to explicitly clean up
  */

  /**
   * Continue to receive WARINING from React: An update to Overview inside a test was not wrapped in act(...).
   * In attemption to resolve the warning, following a tutorial to set up
   * Promise.resolve()
   * act(() => {...})
   * afterEach()
   * to resolve all unresolved promises during test running. However, current solution is NOT WORKING at this moment.
   */

  // NOT WORKING. Setting up a promise resolve for async function to resolve
  const promise = Promise.resolve();

  beforeEach(() => {
    // NOT WORKING. wrapping the render with act is discouraged as render already use act under the hood.
    // doing so here due to a tutorial to resolve the warning instructed so.
    act(() => {render(<Overview
      productId={71697}
      productInfo={sampleData.productInfo}
      yourOutfit={yourOutfit}
      addHandler={() => {addToYourOutfit(71697)}}
      removeHandler={() => {removeFromYourOutfit(71697)}}
      />)});
  });

  // NOT WORKING. Per tutorial to resolve warning from async action (API call) in function component in React.
  afterEach(async () => {
    await waitFor(async () => {
      await promise;
    })
  })

  describe('ImageGallery component', () => {
    it('should have 7 thumbnmails displayed', async () => {
     /**
      * async and await waitFor the component render after recieving response from server.
      * Without await waitFor, the test will run against the initial data of the component.
      *
      * waitFor will wait until the wrapped function do not return error. RTL will execute function with assertions
      * every 50ms(?) until timeout (default at 1000ms, can be changed by passing an timeout in the option argument
      *  to the waitFor(func[, option]). option is an object (ex. {timeout: 2000ms}).
      * If the error does not resolve in after timeout, the test will fail.
      * Otherwise, the test will pass.
      */
      await waitFor(() => {
        const list = screen.getByTestId(/thumbnails/i);
        const thumbnails = within(list).getAllByRole('listitem');
        expect(thumbnails.length).toBe(7)
      });
    });
    it('should not show scroll up icon initially', async () => {
      await waitFor(() => {
        expect(screen.queryByTestId('scroll-up')).toBeNull();
      })
    });
    it('should show scroll down icon initially', async () => {
      await waitFor(() => {
        expect(screen.getByTestId('scroll-down')).toBeInTheDocument();
      })
    });
    it('should not show left arrow when initially load', async () => {
      await waitFor(() => {
        expect(screen.queryByTestId(/left-click/i)).toBeNull();
      })
    });
    it('should show right arrow initially', async () => {
      await waitFor(() => {
        expect(screen.getByTestId(/right-click/i)).toBeInTheDocument();
      })
    });
  });

  describe('ProductInfo component', () => {
    it('should show category', async () => {
      await waitFor(() => {
        expect(screen.getByText('Jackets', {exact: false})).toBeInTheDocument();
      })
    });
    it('check rating stars', async () => {
      await waitFor(() => {
        expect(screen.getByTestId('star-rating')).toBeInTheDocument();
      })
    });
    it('should show product name', async () =>{
      await waitFor(() => {
        expect(screen.getByText('Camo Onesie', {exact: false})).toBeInTheDocument();
      })
    });
  });

  describe('Style component', () => {
    it('should show all styles available as thumbnails', async () => {
      await waitFor(() => {
        expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
      });
    });
    it('should show text of style', async () => {
      await waitFor(() => {
        expect(screen.getByText('STYLE', {exact: false})).toBeInTheDocument();
      });
    });
  });

  describe('Cart component', () => {
    it('should have 2 dropdown selector', async () => {
      await waitFor(() => {
        expect(screen.getAllByRole('combobox').length).toBe(2);
      });
    });
    it('should have default size selector at Select Size', async () => {
      await waitFor(() => {
        expect(screen.getByRole('option', {name: 'Select Size'}).selected).toBe(true);
      });
    });
    it('should have quantity selector disabled when no size is selected', async () => {
      await waitFor(() => {
        expect(screen.getByRole('option', {name: '-'}).selected).toBe(true);
        expect(screen.getByRole('option', {name: '-'})).toBeDisabled();
      });
    });
    it('should have a add to cart button', async () => {
      await waitFor(() => {
        expect(screen.getByRole('button', {name: /ADD TO CART/i})).toBeInTheDocument();
      });
    });
  });

});

describe('User activities', () => {
  beforeEach(() => {
    render(<Overview
      productId={71697}
      productInfo={sampleData.productInfo}
      yourOutfit={yourOutfit}
      addHandler={addToYourOutfit}
      removeHandler={removeFromYourOutfit}/>);
  });

  it('should not show scroll-up when at 1st thumbnails and show scroll-up after scrolling down of the thumbnail', async () => {
    await waitFor(async () => {
      expect(screen.queryByTestId(/scroll-up/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId(/scroll-down/i));
      expect(screen.getByTestId(/scroll-up/i)).toBeInTheDocument();
      await userEvent.click(screen.getByTestId(/scroll-up/i));
      expect(screen.queryByTestId(/scroll-up/i)).not.toBeInTheDocument();
    });
  });

  it('should not show scroll-down when no more thumbnails to scroll', async () => {
    await waitFor(async () => {
      await userEvent.click(screen.getByTestId(/scroll-down/i));
      expect(screen.queryByTestId(/scroll-down/i)).not.toBeInTheDocument();
    });
  });

  it('should show left arrow after clicked right arrow', async () => {
    await waitFor(async () => {
      expect(screen.queryByTestId(/left/i)).not.toBeInTheDocument();
      await userEvent.click(screen.getByTestId(/right/i));
      expect(screen.getByTestId(/left/i)).toBeInTheDocument();
    });
  });

  it('should not show right arrow when at the last image, and should show 1 thumbnail', async () => {
    const rightArrow = await waitFor(() => { return screen.getByTestId(/right/i); });

    // click right arrow 7 times to get to the last image
    for(var i = 0; i < 7; i++) {
      await userEvent.click(rightArrow);
    }
    expect(screen.queryByTestId(/right/i)).not.toBeInTheDocument();
    const list = screen.getByTestId('thumbnails');
    const thumbnails = within(list).getAllByRole('listitem');
    screen.debug();
    expect(thumbnails.length).toBe(1);
  });

  it('should update style name and price after click change style', async () => {
    await waitFor(async () => {
      expect(screen.getByText('Ocean Blue & Grey')).toBeInTheDocument();
      expect(screen.getByText(/100/i)).toBeInTheDocument();
      expect(screen.getByText(/140/i)).toBeInTheDocument();

      // user click a different style
      await userEvent.click(screen.getByRole('img', {name: 'Forest Green & Black'}));

      // style name and price should change
      expect(screen.queryByText('Ocean Blue & Grey')).toBeNull();
      expect(screen.queryByText(/100/i)).not.toBeInTheDocument();
      expect(screen.getByText(/140/i)).toBeInTheDocument();
    });
  });

  it('should enable quantity selector after size is selected', async () => {
    await waitFor(async () => {
      expect(screen.getByRole('option', {name: 'Select Size'}).selected).toBe(true);

      // select size 'S'
      await userEvent.selectOptions(screen.getAllByRole('combobox')[0], screen.getByRole('option', {name: 'S'}))

      expect(screen.getByRole('option', {name: 'S'}).selected).toBe(true)
      expect(screen.getByRole('option', {name: '1'})).not.toBeDisabled();
      expect(screen.getByRole('option', {name: '1'}).selected).toBe(true);
    });
  });

  it('should show warning message when clicking on add to cart without selecting a size', async () => {
    await waitFor(async () => {
      expect(screen.queryByText(/please select a size/i)).not.toBeInTheDocument();
      expect(screen.getByRole('button', {name: /ADD TO CART/i})).toBeInTheDocument();
      act(() => {userEvent.click(screen.getByRole('button', {name: /ADD TO CART/i}))});
      await waitFor(() => {
        expect(screen.getByText(/please select a size/i)).toBeInTheDocument()
      })
    });
  });

  it('should change to expanded view when click once and zoom mode when click second time on the main image', async () => {
    await waitFor(async() => {
      // selecting main image to click
      const imgList = screen.getAllByRole('img', {name: /#1/i});
      const mainImg = imgList[1];

      userEvent.click(mainImg);
      // in expanded view, product name should not show
      expect(screen.queryByText(/camo onesie/i)).not.toBeInTheDocument();

      userEvent.click(mainImg);
      // in zoom mode, thumbnail should not show
      expect(screen.getAllByRole('img').length).toBe(1);
    })
  });

  it('should zoom by 2.5 in zoom mode with mouse over on the image', async () => {
    // get to zoom mode first
    const zoomImgContainer = await waitFor(() => {
      let mainImg = screen.getAllByRole('img', {name: /#1/i})[1];
      userEvent.click(mainImg);
      userEvent.click(mainImg);
      return screen.getByTestId(/zoom/i);
    } );
    // hover over mainImg should zoom
    const mainImg = screen.getByRole('img');
    userEvent.hover(mainImg);
    const zoomStyle = window.getComputedStyle(zoomImgContainer);
    expect(zoomStyle.getPropertyValue('transform')).toContain('scale(2.5');
  });

  it('should return to expanded view if not clicking on main image in zoom mode', async () => {
    // get to zoom mode first
    const zoomImgContainer = await waitFor(() => {
      let mainImg = screen.getAllByRole('img', {name: /#1/i})[1];
      userEvent.click(mainImg);
      return screen.getByTestId(/zoom/i);
    } );

    // click mainImg should return to expanded view
    const mainImg = screen.getByRole('img');
    await userEvent.click(mainImg);
    expect(screen.getByTestId(/thumbnails/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/zoom/i)).not.toBeInTheDocument();
  })
});

describe('App level activity', () => {
  beforeEach(() => {
    render(<App productId={71697}/>);
  })

  it('should switch between solid and empty star when click to add/remove from my outfit', async () => {
    await waitFor(async () => {
      const emptyStar = screen.getByTestId(/empty/i);
      expect(emptyStar).toBeInTheDocument();
      await userEvent.click(emptyStar);
      expect(screen.getByTestId(/filled/i)).toBeInTheDocument();
      await userEvent.click(screen.getByTestId(/filled/i));
      expect(screen.getByTestId(/empty/i)).toBeInTheDocument();
    })
  });
});

// END-TO-END
