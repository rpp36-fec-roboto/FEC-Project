// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import sampleData from './sampleData.js';

// declare which API requests to mock
const server = setupServer(
  rest.get('/products/:product_id', (res, req, ctx) => {
    console.log('product info');
    // response using a mocked JSON body
    return res(ctx.json(sampleData.productInfo));
  }),

  rest.get('/products/:product_id/styles', (req, res, ctx) => {
    if (req.params['product_id'] === '71697') {
      // valid dataset
      return res(ctx.json(sampleData.productStyle));
    } else {
      // invalid dataset
      return res(ctx.json(sampleData.invalidDataset));
    }
  }),

  rest.get('/reviews/meta', (req, res, ctx) => {
    return res(ctx.json(sampleData.reviewsMeta));
  }),

  rest.get('/products/:product_id/related', (req, res, ctx) => {
    return res(ctx.json([71697]));
  }),

  rest.get('/qa/questions', (req, res, ctx) => {
    return res(ctx.json(sampleData.questions));
  }),

  rest.post('/qa/questions', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.get('/qa/questions/:question_id/answers', (req, res, ctx) => {
    return res(ctx.json(sampleData.answers));
  }),

  rest.post('/qa/questions/:question_id/answers', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.put('/qa/questions/:question_id/helpful', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.put('/qa/answer/:answer_id/helpful', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.put('/qa/answer/:answer_id/report', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.post('/cart', (req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.post('/interactions', (req, res, ctx) => {
    const { element, widget, time } = req.body;
    if (element && widget && time) {
      return res(ctx.status(201));
    } else {
      return res(ctx.status(500));
    }
  })
);

export default server;