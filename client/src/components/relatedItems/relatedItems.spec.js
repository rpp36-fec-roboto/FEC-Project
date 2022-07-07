/**
 * @jest-environment jsdom
 */

// import TestRenderer from 'react-test-renderer'; // used for snapshot test
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { render, fireEvent, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from '../../App.jsx';
import RelatedItems from './RelatedItems.jsx';

describe('App', () => {
  let container = null;
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
    expect(container).not.toBeNull();
  });
});

describe('Related Items & Comparison Components', () => {
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

  it('render Related Items component without crash', () => {
    act(() => {
      render(<RelatedItems />, container);
    });
    expect(container).not.toBeNull();
  });
});