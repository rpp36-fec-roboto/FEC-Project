/**
 * @jest-environment jsdom
 */

// import TestRenderer from 'react-test-renderer'; // used for snapshot test
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import RelatedProductCard from './RelatedProductCard.jsx';
import ActionBtn from './ActionButton.jsx';
import PrimaryImage from './Images.jsx';
import Price from './Price.jsx';
import Rating from './Rating.jsx';
import sampleData from '../../data/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';

describe('Related Items & Comparison Widget', () => {
  let state = {
    productId: 71697,
    productInfo: sampleData.productInfo,
    productRatings: sampleData.reviewsMeta,
    productStyle: sampleData.productStyle,
    relatedProduct: sampleData.relatedProduct
  };

  it('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  describe('render product card for a related item', () => {
    beforeEach(() => {
      render(<RelatedProductCard
        listType={'relatedProduct'}
        productId={state.productId}
        productInfo={state.productInfo}
        productRatings={state.productRatings}
        productStyle={state.productStyle}
      />);
    });

    it('renders the default image on the card', () => {
      expect(screen.getByRole('img', {name: 'Forest Green & Black'})).toBeInTheDocument();
      screen.debug();
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

    // update this test after stars are rendered
    it('renders the product rating on the card', () => {
      expect(screen.getByText('Star rating: 3.75/5')).toBeInTheDocument();
    });

  });

  describe('render product card for an outfit item', () => {
    beforeEach(() => {
      render(<RelatedProductCard
        listType={'yourOutfit'}
        productId={state.productId}
        productInfo={state.productInfo}
        productRatings={state.productRatings}
        productStyle={state.productStyle}
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

    // update this test after stars are rendered
    it('renders the product rating on the card', () => {
      expect(screen.getByText('Star rating: 3.75/5')).toBeInTheDocument();
    });
  });

});