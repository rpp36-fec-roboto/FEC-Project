/**
 * @jest-environment jsdom
 */

// import dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';

// import test environment and methds
import '@testing-library/jest-dom'; // provides method for DOM matcher
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react'; // provides methods to test element rendering and user event
import userEvent from '@testing-library/user-event'; // provide method to trigger user activity
import { act } from "react-dom/test-utils";

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// add components to test
import sampleData from '../../data/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';
import App from '../../App.jsx';
import Overview from './Overview.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import Cart from './Cart.jsx';
import OtherInfo from './OtherInfo.jsx';

// setting up a promise resolve for async function to resolve
const promise = Promise.resolve();

// sample data for testing
var state = {
  productInfo: sampleData.productInfo,
  productStyle: sampleData.productStyle,
  reviewsMeta: sampleData.reviewsMeta,
  invalidDataset: sampleData.invalidDataset
};

// set up add/remove yourOutfit handler at local level
var yourOutfit = [];
const addToYourOutfit = (productId) => {
  yourOutfit.push(productId);
}
const removeFromYourOutfit = (productId) => {
  yourOutfit.splice(yourOutfit.indexOf(productId), 1);
}

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/products/:product_id/styles', (req, res, ctx) => {
    if (req.params['product_id'] === '71697') {
      // valid dataset
      return res(ctx.json(state.productStyle));
    } else {
      // invalid dataset
      return res(ctx.json(state.invalidDataset));
    }
  }),

  rest.get('/reviews/meta', (req, res, ctx) => {
    return res(ctx.json(state.reviewsMeta));
  }),

  rest.post('/interactions', (req, res, ctx) => {
    const { element, widget, time } = req.body;
    if(element && widget && time) {
      return res(ctx.status(201));
    } else {
      return res(ctx.status(500));
    }
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());


describe('helper function unit tests', () => {
  it('should calculate average rating', () => {
    expect(helper.calculateRating(sampleData.reviewsMeta.ratings)).toBe('72%');
  });

  it('should return false when quantity of all skus in a style is 0', () => {
    expect(helper.inStock(sampleData.invalidDataset.results[0].skus)).toBe(false);
  });
});


describe('Overview widget rendering', () => {
  // react testing library injected global afterEach cleanup to Jest framework
  // no need to explicitly clean up

  beforeEach(() => {
    act(() => {render(<Overview
      productId={71697}
      productInfo={state.productInfo}
      yourOutfit={yourOutfit}
      addHandler={addToYourOutfit}
      removeHandler={removeFromYourOutfit}
      />)})
  });

  // adding promise resolve so the warning of async action (API call) will not show warning from React
  afterEach(async () => {
    await act(async () => {
      await promise;
    })
  })

  describe('ImageGallery component', () => {
    it('should have 4 thumbnmails displayed', () => {
      const list = screen.getByTestId('thumbnails');
      const thumbnails = within(list).getAllByRole('listitem')
      expect(thumbnails.length).toBe(4);
    });
    it('should not show scroll up icon initially', () => {
      expect(screen.queryByTestId('scroll-up')).toBeNull();
    });
    it('should show scroll down icon initially', () => {
      expect(screen.getByTestId('scroll-down')).toBeInTheDocument();
    });
    it('should not show left arrow when initially load', () => {
      expect(screen.queryByTestId(/left-click/i)).toBeNull();
    });
    it('should show right arrow initially', () => {
      expect(screen.getByTestId(/right-click/i)).toBeInTheDocument();
    });
  });

  describe('ProductInfo component', () => {
    it('should show category', () => {
      expect(screen.getByText('Jackets', {exact: false})).toBeInTheDocument();
    });
    it('check rating stars', () => {
      expect(screen.getByTestId('star-rating')).toBeInTheDocument();
    });
    it('should show product name', () =>{
      expect(screen.getByText('Camo Onesie', {exact: false})).toBeInTheDocument();
    });
  });

  describe('Style component', () => {
    it('should show all styles available as thumbnails', () => {
      expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    });
    it('should show text of style', () => {
      expect(screen.getByText('STYLE', {exact: false})).toBeInTheDocument();
    });
  });

  describe('Cart component', () => {
    it('should have 2 dropdown selector', () => {
      expect(screen.getAllByRole('combobox').length).toBe(2);
    });
    it('should have default size selector at Select Size', () => {
      expect(screen.getByRole('option', {name: 'Select Size'})).toBeInTheDocument();
    });
    it('should have quantity selector disabled when no size is selected', () => {
      expect(screen.getByRole('option', {name: '-'})).toBeDisabled();
    });
    it('should have a add to cart button', () => {
      expect(screen.getByRole('button', {name: /ADD TO CART/i})).toBeInTheDocument();
    });
  });

});

// test invalid dataset, product out of stock, img url is null
describe('Cart with OUT OF STOCK style', () => {
  beforeEach(() => {
    render(<Cart
      currentStyle={state.invalidDataset.results[0]}
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

describe.only('User activities', () => {
  beforeEach(() => {
    render(<Overview
      productId={71697}
      productInfo={state.productInfo}
      yourOutfit={yourOutfit}
      addHandler={addToYourOutfit}
      removeHandler={removeFromYourOutfit}/>);
  })

  it('should show scroll up after scrolling down of the thumbnail', async () => {
    expect(screen.queryByTestId(/scroll-up/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId(/scroll-down/i));
    expect(screen.getByTestId(/scroll-up/i)).toBeInTheDocument();
  });

  it('should not show scroll down when no more thumbnails to scroll', async () => {
    await userEvent.click(screen.getByTestId(/scroll-down/i));
    expect(screen.queryByTestId(/scroll-down/i)).not.toBeInTheDocument();
  });

  it('should update style name and price after click change style', async () => {
    expect(screen.getByText('Ocean Blue & Grey')).toBeInTheDocument();
    // expect(screen.getByText((content, element) => { content.startsWith('$')})).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/140/i)).toBeInTheDocument();
    // user click event
    await userEvent.click(screen.getByRole('img', {name: 'Forest Green & Black'}));
    // the name should disappear from the DOM
    expect(screen.queryByText('Ocean Blue & Grey')).toBeNull();
    expect(screen.queryByText(/100/i)).not.toBeInTheDocument();
    expect(screen.getByText(/140/i)).toBeInTheDocument();
  });

  // it.todo('should change price when switch style', async () => {
  //   await userEvent.click(screen.)
  // });
  it.todo('should expand size selector menu when clicked');
  it.todo('after select size, enable quantity selector');
  it.todo('clicking on add to cart without selecting a size should show warning message');
  it.todo('should switch between solid and empty star when click to add/remove from my outfit');
});

// END-TO-END
