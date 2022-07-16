/**
 * @jest-environment jsdom
 */

// import dependencies
import React from 'react';

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// add the component to test
import RelatedItems from './RelatedItems.jsx';
import sampleData from '../../data/sampleData.js';

let reqData = {
  productId: 71697
}

let resData = {
  productInfo: sampleData.productInfo,
  productRatings: sampleData.reviewsMeta,
  productStyle: sampleData.productStyle,
  relatedProduct: sampleData.relatedProduct
}

// declare which API requests to mock
const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/products/:product_id', (req, res, ctx) => {
    // response using a mocked JSON body
    return res(ctx.json(resData.productInfo));
  }),

  rest.get('/products/:product_id/styles', (req, res, ctx) => {
    // response using a mocked JSON body
    return res(ctx.json(reqData.productStyle));
  }),

  rest.get('/products/:product_id/related', (req, res, ctx) => {
    // response using a mocked JSON body
    return res(ctx.json([productId]));
  }),

  rest.get('/reviews/meta', (req, res, ctx) => {
    // response using a mocked JSON body
    return res(ctx.json(reqData.reviewsMeta));
  })
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

describe('Related Items & Comparison Widget', () => {

  test ('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  test('loads and displays', async () => {
    render(<RelatedItems productId={reqData.productId} yourOutfit={[]} />);

    await waitFor(() => screen.getByRole('heading', {name: /RELATED PRODUCT/i}));

    expect(screen.getByRole('heading', {name: /RELATED PRODUCT/i})).toBeInTheDocument();
    // screen.debug();

  })
});

// test('handles server error', async () => {
//   server.use(
//     rest.get('/greeting', (req, res, ctx) => {
//       return res(ctx.status(500));
//     })
//   )

//   render(<RelatedItems url='/greeting' />);

//   fireEvent.click(screen.getByText('Load Greeting'));

//   await waitFor(() => screen.getByRole('alert'));

//   expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!');
//   expect(screen.getByRole('button')).not.toBeDisabled();
// })

