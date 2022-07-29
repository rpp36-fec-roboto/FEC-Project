/**
 * @jest-environment jsdom
 */

// import TestRenderer from 'react-test-renderer'; // used for snapshot test
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { render, screen, waitFor, within, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act, ReactTestUtils } from 'react-dom/test-utils';
import mockServer from '../../mockFiles/mockServer.js';
import data from '../../mockFiles/sampleData.js';

import App from '../../App.jsx';
import Qna from './qna.jsx';



// establish API mocking before all tests
beforeAll(() => mockServer.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => mockServer.resetHandlers());
// clean up once the tests are done
afterAll(() => mockServer.close());


describe('Q&A Component', () => {

  const promise = Promise.resolve();

  beforeEach(() => {
    var id = '71697';
    var info = data.productInfo;
    act(() => {
      render(<Qna
        productId={id}
        productInfo={info}/>);
    });
  });

  afterEach(async () => {
    await waitFor(async () => {
      await promise;
    })
  })


  it('renders Q&A component without crashing', () => {
    let title = screen.getByText('QUESTION & ANSWERS');
    expect(title).toBeInTheDocument();
  });

});


describe('User events', () => {

  const promise = Promise.resolve();

  beforeEach(() => {
    var id = '71697';
    var info = data.productInfo;
    act(() => {
      render(<Qna
        productId={id}
        productInfo={info}/>);
    });
  });

  afterEach(async () => {
    await waitFor(async () => {
      await promise;
    })
  })
  it('clicks X button to close add question modal then clicking ADD A QUESTION should open it back up', async () => {
    await waitFor(async () => {
      expect(screen.getByTestId('question')).toBeVisible();
      await userEvent.click(screen.getByTestId('question'));
      expect(screen.getByText('Ask Your Question')).not.toBeVisible();
      await userEvent.click(screen.getByRole('button', {name: /add a question +/i}));
      expect(screen.getByText('Ask Your Question')).toBeVisible();
    })
  })

  it('clicks X button to close add answer modal', async () => {
    await waitFor(async () => {
      expect(screen.getByTestId('answer')).toBeVisible();
      await userEvent.click(screen.getByTestId('answer'));
      expect(screen.getByText('Add an answer')).not.toBeVisible(); // change to .not
    })
  })

  it('clicks See More Answers will load more answers ', async () => {
    await waitFor(async () => {
      expect(screen.queryByTestId('moreanswers')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', {name: /see more answers/i}));
      expect(screen.getByTestId('moreanswers')).toBeInTheDocument();
    })
  })

  it('clicks More Answered Questions will load more questions ', async () => {
    await waitFor(async () => {
      expect(screen.queryByTestId('morequestions')).not.toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', {name: /more answered questions/i}));
      expect(screen.getByTestId('morequestions')).toBeInTheDocument();
    })
  })

  it('clicks the report button and changes to reported ', async () => {
    await waitFor(async () => {
      expect(screen.getByTestId('report5986024')).toHaveTextContent('Report');
      await userEvent.click(screen.getByTestId('report5986024'));
      expect(screen.getByTestId('report5986024')).toHaveTextContent('Reported');
    })
  })

  it('clicks the yes button on the question and does not change the number as it has already been clicked ', async () => {
    await waitFor(async () => {
      expect(screen.getByTestId('yes641727')).toHaveTextContent('(4)');
      await userEvent.click(screen.getByTestId('yesquestion641727'));
      expect(screen.getByTestId('yes641727')).toHaveTextContent('(4)');
    })
  })

  it('clicks the yes button on the answer and does not change the number as it has already been clicked ', async () => {
    await waitFor(async () => {
      expect(screen.getByTestId('answer5986024')).toHaveTextContent('(2)');
      await userEvent.click(screen.getByTestId('yesanswer5986024'));
      expect(screen.getByTestId('answer5986024')).toHaveTextContent('(2)');
    })
  })
});

