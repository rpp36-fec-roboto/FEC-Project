/**
 * @jest-environment jsdom
 */

// import TestRenderer from 'react-test-renderer'; // used for snapshot test
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { unmountComponentAtNode } from 'react-dom';
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

describe('Overview widget static rendering', () => {
  let container;
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

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  it('render ProductInfo component without crash', () => {
    render(<ProductInfo productInfo={state.productInfo} rating={helper.calculateRating(state.reviewsMeta)}/>, container);
    expect(container).not.toBeNull();
    expect(screen.getByText('Jackets', {exact: false})).toBeInTheDocument();
    expect(screen.getByText('rating', {exact: false})).toBeInTheDocument();
    expect(screen.getByText('Camo Onesie', {exact: false})).toBeInTheDocument();
  });

  it('render ImageGallery component without crash', () => {
    render(<ImageGallery
      currentStyle={state.currentStyle}
      mainImgIndex={state.mainImgIndex}
      maxThumbnails={state.maxThumbnails}
      thumbnailStartIndex={state.thumbnailStartIndex}
    />, container);
    expect(container).not.toBeNull();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('button', {name: 'Left arrow'})).toBeNull();
    expect(screen.getByRole('button', {name: 'Right arrow'})).toBeInTheDocument();
    console.log(container);
    expect(screen.getAllByRole('img').length).toBe(5);
  });

  it('render Cart component without crash', () => {
    act(() => {
      render(<Cart
        currentStyle={state.currentStyle}
        // isYourOutfit={state.isYourOutfit}
        selectedSize={state.selectedSize}
        selectedQuant={state.selectedQuant}
      />, container);
    });
    expect(container).not.toBeNull();
  });

  it('render Cart when style is out of stock', () => {
    render(<Cart
      currentStyle={sampleData.outOfStockStyle}
      isYourOutfit={state.isYourOutfit}
      selectedSize={state.selectedSize}
      selectedQuant={state.selectedQuant}
    />);
    expect(screen.getAllByRole('option').length).toBe(2);
    expect(screen.getByRole('option', {name: 'OUT OF STOCK'})).toBeInTheDocument();
    expect(screen.getByRole('option', {name: '-'})).toBeInTheDocument();
  });

});

describe('User activities', () => {
  it('should switch between solid and empty star when click to add/remove from my outfit', () => {
    // render(<Cart currentStyle={sampleData.productStyle.results[0]} />);
    // expect(screen.getByRole('div', { name: 'AiOutlineStar'})).toBeInTheDocument();
  });
});

// INTEGRATION
describe('App connection to server', () => {
  // it('render Overview component', () => {
  //   render(<Overview reviewsMeta={state.reviewsMeta}/>, container);
  //   // expect(screen.)
  //   expect(container).not.toBeNull();
  // });
});

// END-TO-END
// describe('App rendering', () => {
//   let container = document.createElement('div');
//   it('render App without crashing', () => {
//     act(() => {
//       ReactDOMClient.createRoot(container).render(<App />);
//     });
//     expect(container).not.toBeNull();
//   });
// });
