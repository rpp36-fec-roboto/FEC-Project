// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import sampleData from './sampleDataRI.js';

// declare which API requests to mock
const server = setupServer(
  rest.get('/products/:product_id', (res, req, ctx) => {
    console.log('server info: ', req.params);
    if (req.params['product_id'] === '71697') {
      return res(ctx.json(sampleData.productInfo[0]));
    }
    if (req.params['product_id'] === '71698') {
      return res(ctx.json(sampleData.productInfo[1]));
    }
    if (req.params['product_id'] === '71699') {
      return res(ctx.json(sampleData.productInfo[2]));
    }
    if (req.params['product_id'] === '71700') {
      return res(ctx.json(sampleData.productInfo[3]));
    }
    if (req.params['product_id'] === '71701') {
      return res(ctx.json(sampleData.productInfo[4]));
    }
    if (req.params['product_id'] === '71702') {
      return res(ctx.json(sampleData.productInfo[5]));
    }
    if (req.params['product_id'] === '71703') {
      return res(ctx.json(sampleData.productInfo[6]));
    }
    if (req.params['product_id'] === '71704') {
      return res(ctx.json(sampleData.productInfo[7]));
    }
    if (req.params['product_id'] === '71705') {
      return res(ctx.json(sampleData.productInfo[8]));
    }
  }),

  rest.get('/products/:product_id/styles', (req, res, ctx) => {
    console.log('server styles: ', req.params);
    if (req.params['product_id'] === '71697') {
      return res(ctx.json(sampleData.productStyle[0]));
    }
    if (req.params['product_id'] === '71698') {
      return res(ctx.json(sampleData.productStyle[1]));
    }
    if (req.params['product_id'] === '71699') {
      return res(ctx.json(sampleData.productStyle[2]));
    }
    if (req.params['product_id'] === '71700') {
      return res(ctx.json(sampleData.productStyle[3]));
    }
    if (req.params['product_id'] === '71701') {
      return res(ctx.json(sampleData.productStyle[4]));
    }
    if (req.params['product_id'] === '71702') {
      return res(ctx.json(sampleData.productStyle[5]));
    }
    if (req.params['product_id'] === '71703') {
      return res(ctx.json(sampleData.productStyle[6]));
    }
    if (req.params['product_id'] === '71704') {
      return res(ctx.json(sampleData.productStyle[7]));
    }
    if (req.params['product_id'] === '71705') {
      return res(ctx.json(sampleData.productStyle[8]));
    }
  }),

  rest.get('/reviews/meta', (req, res, ctx) => {
    console.log('server reviews: ', req.params);
    if (req.params['product_id'] === '71697') {
      return res(ctx.json(sampleData.reviewsMeta[0]));
    }
    if (req.params['product_id'] === '71698') {
      return res(ctx.json(sampleData.reviewsMeta[1]));
    }
    if (req.params['product_id'] === '71699') {
      return res(ctx.json(sampleData.reviewsMeta[2]));
    }
    if (req.params['product_id'] === '71700') {
      return res(ctx.json(sampleData.reviewsMeta[3]));
    }
    if (req.params['product_id'] === '71701') {
      return res(ctx.json(sampleData.reviewsMeta[4]));
    }
    if (req.params['product_id'] === '71702') {
      return res(ctx.json(sampleData.reviewsMeta[5]));
    }
    if (req.params['product_id'] === '71703') {
      return res(ctx.json(sampleData.reviewsMeta[6]));
    }
    if (req.params['product_id'] === '71704') {
      return res(ctx.json(sampleData.reviewsMeta[7]));
    }
    if (req.params['product_id'] === '71705') {
      return res(ctx.json(sampleData.reviewsMeta[8]));
    }
  }),

  rest.get('/products/:product_id/related', (req, res, ctx) => {
    return res(ctx.json(sampleData.relatedProduct));
  })

);

export default server;