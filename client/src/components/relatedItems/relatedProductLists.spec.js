/**
 * @jest-environment jsdom
 */

// import dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOMClient from 'react-dom/client';

// import test environment and methods
import '@testing-library/jest-dom'; // provides method for DOM matcher
import { render, fireEvent, screen } from '@testing-library/react'; // provides methods to test element rendering and user event
import userEvent from '@testing-library/user-event'; // provide method to trigger user activity
import { act } from 'react-dom/test-utils';
// import TestRenderer from 'react-test-renderer'; // used for snapshot test


// import API mocking utilities and Mock Service Worker
// import mockServer from '../../mockFiles/mockServer.js';

// add components to test
import App from '../../App.jsx';
import RelatedItems from './RelatedItems.jsx';
import RelatedProductLists from './RelatedProductLists.jsx';
import RelatedProductCard from './RelatedProductCard.jsx';
// import ActionBtn from './ActionButton.jsx';
// import PrimaryImage from './Images.jsx';
// import Price from './Price.jsx';
// import Rating from './Rating.jsx';

// add helper data and functions
import sampleData from '../../data/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';

/////////////////////////////////////////////////
//------------------  TESTS  ------------------//
/////////////////////////////////////////////////

describe('Related Items & Comparison Widget', () => {
  let state = {
    productId: 71697,
    productInfo: sampleData.productInfo,
    productReviews: sampleData.reviewsMeta,
    productStyles: sampleData.productStyle,
    relatedProduct: sampleData.relatedProduct,
    yourOutfit: []
  };

  it('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  describe('render related product list', () => {
    beforeEach(() => {
      render(<RelatedProductLists
        listType={'relatedProduct'}
        productId={state.productId}
        productInfo={state.productInfo}
        productReviews={state.productReviews}
        productStyles={state.productStyles}
        relatedProduct={state.relatedProduct}
      />);
    });

    it('renders the default image on the card', () => {
      expect(screen.getByRole('img', {name: 'Forest Green & Black'})).toBeInTheDocument();
    });

    it('renders an add button on the card', () => {
      expect(screen.getByRole('button', {name: 'Add item to your outfit'})).toBeInTheDocument();
    });

    it('renders the category name on the card', () => {
      expect(screen.getByText('Jackets')).toBeInTheDocument();
    });

    it('renders the product name on the card', () => {
      expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
    });

    it('renders the default price on the card', () => {
      expect(screen.getByText('$140.00')).toBeInTheDocument();
    });

    // update after sale price is captured
    it.todo('renders sales price with original price lined-out');

  });

  describe('render outfit list', () => {
    beforeEach(() => {
      render(<RelatedProductCard
        listType={'yourOutfit'}
        productId={state.productId}
        productInfo={state.productInfo}
        productReviews={state.productReviews}
        productStyles={state.productStyles}
        yourOutfit={state.yourOutfit}
      />);
    });

    it('renders the default image on the card', () => {
      expect(screen.getByRole('img', {name: 'Forest Green & Black'})).toBeInTheDocument();
    });

    it('renders a remove button on the card', () => {
      expect(screen.getByRole('button', {name: 'Remove item from your outfit'})).toBeInTheDocument();
    });

    it('renders the category name on the card', () => {
      expect(screen.getByText('Jackets')).toBeInTheDocument();
    });

    it('renders the product name on the card', () => {
      expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
    });

    it('renders the default price on the card', () => {
      expect(screen.getByText('$140.00')).toBeInTheDocument();
    });

    // update after sale price is captured
    it.todo('renders sales price with original price lined-out');

  });

});