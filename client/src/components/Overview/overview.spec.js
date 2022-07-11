/**
 * @jest-environment jsdom
 */

// import TestRenderer from 'react-test-renderer'; // used for snapshot test
import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, screen, fireEvent } from '@testing-library/react'; // provides methods to test element rendering and user event
import '@testing-library/jest-dom'; // provides method for DOM matcher
import userEvent from '@testing-library/user-event';
// import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import sampleData from '../../data/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';
import App from '../../App.jsx';
import Overview from './Overview.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import Cart from './Cart.jsx';
import OtherInfo from './OtherInfo.jsx';

describe('helper function unit tests', () => {
  it('should find the default style', () => {
    var defaultStyle = sampleData.productStyle.results[0];
    expect(helper.findDefaultStyle(sampleData.productStyle)).toBe(defaultStyle);
  });

  it('should calculate average rating', () => {
    expect(helper.calculateRating(sampleData.reviewsMeta.ratings)).toBe(3.86);
  });

  it('should return false when quantity of all skus in a style is 0', () => {
    expect(helper.inStock(sampleData.outOfStockStyle.skus)).toBe(false);
  });
});

describe('Overview widget rendering', () => {
  // react testing library injected global afterEach cleanup to Jest framework
  // no need to explicitly clean up
  let state = {
    productInfo: sampleData.productInfo,
    productStyle: sampleData.productStyle,
    currentStyle: sampleData.productStyle.results[0],
    reviewsMeta: sampleData.reviewsMeta,
    yourOutfit: [71697],
    mainImgIndex: 0,
    thumbnailStartIndex: 0,
    selectedSize: 'Select Size',
    selectedQuant: 0
  };


  // let container;
  // beforeEach(() => {
  //   // setup a DOM element as a render target
  //   container = document.createElement('div');
  //   document.body.appendChild(container);
  // });

  // afterEach(() => {
  //   // cleanup on exiting
  //   unmountComponentAtNode(container);
  //   container.remove();
  //   container = null;
  // });

  describe('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  describe('render ProductInfo component correctly', () => {
    beforeEach(() => {
      render(<ProductInfo productInfo={state.productInfo} rating={helper.calculateRating(state.reviewsMeta)}/>);
    });
    it('should show category', () => {
      expect(screen.getByText('Jackets', {exact: false})).toBeInTheDocument();
    });
    it('should show rating', () => {
      expect(screen.getByText('rating', {exact: false})).toBeInTheDocument();
    });
    it('should show product name', () =>{
      expect(screen.getByText('Camo Onesie', {exact: false})).toBeInTheDocument();
    });
  });

  describe('ImageGallery component', () => {
    beforeEach(() => {
      render(<ImageGallery
        currentStyle={state.currentStyle}
        mainImgIndex={state.mainImgIndex}
        maxThumbnails={state.maxThumbnails}
        thumbnailStartIndex={state.thumbnailStartIndex}
      />);
    });

    it('should have a list of thumbnmails', () => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
    it('should not show scroll up icon initially', () => {
      expect(screen.queryByTestId('scroll-up')).toBeNull();
    });
    it('should show scroll down icon initially', () => {
      expect(screen.getByTestId('scroll-down')).toBeInTheDocument();
    });
    it('should not show left arrow when initially load', () => {
      expect(screen.queryByRole('button', {name: 'Left arrow'})).toBeNull();
    });
    it('should show right arrow initially', () => {
      expect(screen.getByRole('button', {name: 'Right arrow'})).toBeInTheDocument();
    });
  });

  describe('Style component', () => {
    beforeEach(() => {
      render(<Style
        productStyle={state.productStyle}
        currentStyle={state.currentStyle}
      />);
    });

    it('should show all styles available as thumbnails', () => {
      expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    });
    it('should show text of style', () => {
      expect(screen.getByText('STYLE', {exact: false})).toBeInTheDocument();
    });
  });

  describe('Cart component', () => {
    beforeEach(() => {
      render(<Cart
        currentStyle={state.currentStyle}
        selectedSize={state.selectedSize}
        selectedQuant={state.selectedQuant}
      />);
    });
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
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Cart with OUT OF STOCK style', () => {
    beforeEach(() => {
      render(<Cart
        currentStyle={sampleData.outOfStockStyle}
        isYourOutfit={state.isYourOutfit}
        selectedSize={state.selectedSize}
        selectedQuant={state.selectedQuant}
      />);
    });
    it('should show out of stock in size selector and disable selector', () => {
      let sizeSelector = screen.getByRole('option', {name: 'OUT OF STOCK'});
      expect(sizeSelector).toBeInTheDocument();
      expect(sizeSelector).toBeDisabled();
    });
    it('should have quantity selector disabled when no size is selected', () => {
      expect(screen.getByRole('option', {name: '-'})).toBeDisabled();
    });
  });
});

describe('User activities', () => {
  it('should update style name after click another style', async () => {
    await render(<App />);
    expect(screen.getByText('Forest Green & Black')).toBeInTheDocument();
    const clickedStyle = screen.getByRole('img', {name: 'Ocean Blue & Grey'});
    expect(clickedStyle).toBeInTheDocument();
    await userEvent.click(clickedStyle);
    const styleName = screen.queryByRole('span', {name:'Forest Green & Black'});
    expect(styleName).toBeNull();
  });

  it.todo('should show scroll up after scrolling down of the thumbnail');
  it.todo('should not show scroll down after scrolling');
  it.todo('should show correct price with current style');
  it.todo('should expand size selector menu when clicked');
  it.todo('after select size, enable quantity selector');
  it.todo('clicking on add to cart without selecting a size should show warning message');
  it.todo('should switch between solid and empty star when click to add/remove from my outfit');
});

// END-TO-END
// describe('App rendering', () => {
//   let container = document.createElement('div');
//   it('render App without crashing', () => {
//     act(() => {
//       ReactDOM.createRoot(container).render(<App />);
//     });
//     expect(container).not.toBeNull();
//   });
// });
