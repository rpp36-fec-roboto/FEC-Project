/**
 * @jest-environment jsdom
 */

// import TestRenderer from 'react-test-renderer'; // used for snapshot test
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { render, fireEvent, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import sampleData from '../../data/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';

import App from '../../App.jsx';
import Overview from './Overview.jsx';

describe('helper function unit tests', () => {
  it('should find the default style', () => {
    var defaultStyle = sampleData.productStyle.results[0];
    expect(helper.findDefaultStyle(sampleData.productStyle)).toBe(defaultStyle);
  });

  it('should calculate average rating', () => {
    expect(helper.calculateRating(sampleData.reviewsMeta.ratings)).toBe(3.86);
  });
});

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
      render(<Overview reviewsMeta={sampleData.reviewsMeta}/>, container);
    });
    expect(container).not.toBeNull();
  });
});
