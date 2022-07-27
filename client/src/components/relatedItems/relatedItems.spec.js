/**
 * @jest-environment jsdom
 */

// import dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOMClient from 'react-dom/client';

// import test environment and methods
import '@testing-library/jest-dom'; // provides method for DOM matcher
import { render, screen, waitFor, within, cleanup } from '@testing-library/react'; // provides methods to test element rendering and user event
import userEvent from '@testing-library/user-event'; // provide method to trigger user activity
import { act } from 'react-dom/test-utils';
// import TestRenderer from 'react-test-renderer'; // used for snapshot test


// import API mocking utilities and Mock Service Worker
import mockServer from '../../mockFiles/mockServerRI.js';

// add components to test
import App from '../../App.jsx';
import RelatedItems from './RelatedItems.jsx';
import RelatedProductLists from './RelatedProductLists.jsx';
import RelatedProductCard from './RelatedProductCard.jsx';
import ActionBtn from './ActionButton.jsx';
import AddToOutfitCard from './AddToOutfitCard.jsx';
// import PrimaryImage from './Images.jsx';
// import Price from './Price.jsx';
// import Rating from './Rating.jsx';

// add helper data and functions
import sampleData from '../../mockFiles/sampleDataRI.js';
import helper from '../../../../lib/clientHelpers.js';

/////////////////////////////////////////////////
//---------------  TEST SETUP  ----------------//
/////////////////////////////////////////////////

// establish API mocking before all tests
beforeAll(() => mockServer.listen());

// reset any request handlers that are declared as a part of our tests
afterEach(() => mockServer.resetHandlers());

afterAll(() => mockServer.close());

/////////////////////////////////////////////////
//---------------  UNIT TEST  -----------------//
/////////////////////////////////////////////////

describe('helper function unit tests', () => {
  it('should calculate average rating', () => {
    expect(helper.calculateRating(sampleData.reviewsMeta[0].ratings)).toBe('80%');
    expect(helper.calculateRating(sampleData.reviewsMeta[1].ratings)).toBe('90%');
    expect(helper.calculateRating(sampleData.reviewsMeta[2].ratings)).toBe('68%'); // 65 + 3
    expect(helper.calculateRating(sampleData.reviewsMeta[3].ratings)).toBe('72%'); // 75 - 3
  });
});

describe('Add to outfit', () => {
  it('it calls add to outfit on button click', async () => {
    let productId = 71697;
    const mockAdd = jest.fn();
    render(<ActionBtn listType='relatedProduct' productId={productId} onClickAction={mockAdd} />);
    await waitFor(() => {
      const addBtn = screen.getByRole('button', { name: /add item to your outfit/i });
      userEvent.click(addBtn);
      expect(mockAdd).toHaveBeenCalledTimes(1);
    });
  });

  it('it calls add to outfit card click', async () => {
    let productId = 71697;
    const mockAdd = jest.fn();
    render(<AddToOutfitCard productId={productId} onAddCardClick={mockAdd} data-testid='add-to-outfit' />);
    await (() => {
      const addBtn = screen.getByTestId('add-to-outfit');
      userEvent.click(addBtn);
      expect(mockAdd).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Remove from outfit', () => {
  it('it calls remove from outfit on button click', async () => {
    let productId = 71697;
    const mockRemove = jest.fn();
    render(<ActionBtn listType='yourOutfit' productId={productId} onClickAction={mockRemove} />);
    await waitFor(() => {
      const removeBtn = screen.getByRole('button', { name: /remove item from your outfit/i });
      userEvent.click(removeBtn);
      expect(mockRemove).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Select new product', () => {
  it('it calls change products on card click', async () => {
    let productId = 71697;
    const mockSelect = jest.fn();
    render(<RelatedProductCard
      data-testid='rp-card'
      listType='yourOutfit'
      productId={productId}
      productInfo={sampleData.productInfo[0]}
      productRatings={sampleData.reviewsMeta[0]}
      productStyles={sampleData.productStyle[0]}
      onCardClick={mockSelect}
    />);
    await (() => {
      const card = screen.getByTestId('rp-card');
      userEvent.click(card);
      expect(mockSelect).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Related Items & Comparison Widget', () => {
  let state = {
    productId: 71697,
    productInfo: sampleData.productInfo,
    productRatings: sampleData.reviewsMeta,
    productStyle: sampleData.productStyle,
    relatedProduct: sampleData.relatedProduct,
    yourOutfit: [71698, 71699, 71700, 71705]
  };

  it('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  describe('render RelatedItem component', () => {
    beforeEach(() => {
      render(<RelatedItems productId={state.productId} relatedProduct={state.relatedProduct} yourOutfit={state.yourOutfit} />);
    });

    it('should show headers', () => {
      expect(screen.getByText('RELATED PRODUCTS', {exact: false})).toBeInTheDocument();
      expect(screen.getByText('YOUR OUTFIT', {exact: false})).toBeInTheDocument();
    });

  });

  describe('render related product list component', () => {
    beforeEach(() => {
      render(<RelatedProductLists
        listType='relatedProduct'
        productId={state.productId}
        productInfo={state.productInfo}
        productReviews={state.productRatings}
        productStyles={state.productStyle}
        relatedProduct={state.relatedProduct}
      />);
    });

    it('should show headers', () => {
      console.log('listType');
      expect(screen.getByText('RELATED PRODUCTS', {exact: false})).toBeInTheDocument();
    });

    // it('should have 4 product cards displayed', () => {
      // const list = screen.getElementsByClassName('rp-card-container');
      // const cards = within(list).getAllByRole('listitem');
    //   expect(screen.getElementsByClassName('rp-card-container').length).toBe(4);
    // });
  });

  describe('render product card for a related item', () => {
    beforeEach(() => {
      render(<RelatedProductCard
        listType={'relatedProduct'}
        productId={state.productId}
        productInfo={state.productInfo[0]}
        productRatings={state.productRatings[0]}
        productStyles={state.productStyle[0]}
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

    // update this test after stars are rendered
    // it('renders the product rating on the card', () => {
    //   expect(screen.getByText('Star rating: 3.75/5')).toBeInTheDocument();
    // });
  });

  describe('render product card for an outfit item', () => {
    beforeEach(() => {
      render(<RelatedProductCard
        listType={'yourOutfit'}
        productId={71705}
        productInfo={state.productInfo[8]}
        productRatings={state.productRatings[8]}
        productStyles={state.productStyle[8]}
      />);
    });

    it('renders the default image on the card', () => {
      expect(screen.getByRole('img', {name: 'White'})).toBeInTheDocument();
    });

    it('renders a remove button on the card', () => {
      expect(screen.getByRole('button', {name: 'Remove item from your outfit'})).toBeInTheDocument();
    });

    it('renders the category name on the card', () => {
      expect(screen.getByText('Kicks')).toBeInTheDocument();
    });

    it('renders the product name on the card', () => {
      expect(screen.getByText('Summer Shoes')).toBeInTheDocument();
    });

    it('renders the sale price on the card', () => {
      expect(screen.getByText('$54.00')).toBeInTheDocument();
    });

    it('renders the original price on the card', () => {
      expect(screen.getByText('$59.00')).toBeInTheDocument();
    });

    // update after sale price is captured
    it.todo('renders sales price with original price lined-out');

  //   // update this test after stars are rendered
  //   it('renders the product rating on the card', () => {
  //     expect(screen.getByText('Star rating: 3.75/5')).toBeInTheDocument();
  //   });
  });


  // describe('render RelatedProductLists component', () => {
  //   beforeEach(() => {
  //     render(<RelatedItems productId={state.productId} yourOutfit={state.yourOutfit} />);
  //   });

  //   it('render Related Items component without crashing', () => {
  //     expect(container).not.toBeNull();
  //   });
  // });

});