/**
 * @jest-environment jsdom
 */

// import TestRenderer from 'react-test-renderer'; // used for snapshot test
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { render, fireEvent, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../client/src/App.jsx';
import Overview from '../client/src/components/Overview/Overview.jsx';
import Qna from '../client/src/components/qna/qna.jsx';

describe('App', () => {
  let container;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    container.remove();
    container = null;
  });

  it('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });

  it('render App without crashing', () => {
    act(() => {
      ReactDOMClient.createRoot(container).render(<App />);
    });
  });
  expect(container).not.toBeNull();

});

// Overview Portion /////////////////////////////////////////////////////////

describe('Overview Component', () => {
  let container = null;
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

  it('render Overview component without crash', () => {
    act(() => {
      render(<Overview />, container);
    });
    expect(container).not.toBeNull();
  });
});

// Q&A Portion ////////////////////////////////////////////////////////////////////

describe('Questions & Answers Component', () => {
  let container = null;
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

  it('renders Q&A component without crashing', () => {
    act(() => {
      render(<Qna />, container);
    });
    expect(container).not.toBeNull();
  });
});

// Related Items Portion ////////////////////////////////////////////////////////////////////