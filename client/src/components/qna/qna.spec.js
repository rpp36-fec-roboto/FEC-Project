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
import Qna from './qna.jsx';
import QuestionAnswer from './questionAnswer.jsx';
import BottomButtons from './bottomButtons.jsx';
import Answer from './answer.jsx';
import Question from './question.jsx';
import Userhelpful from './userhelpful.jsx';
import QuestionHelpful from './questionHelpful.jsx';
import data from '../../data/sampleData.js';



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

  it('renders QuestionAnswer component without crashing', () => {
    act(() => {
      render(<QuestionAnswer questions={data.questions.results} />, container);
    });
    expect(container).not.toBeNull();
  });

  it('renders BottomButtons component without crashing', () => {
    act(() => {
      render(<BottomButtons questions={data.questions.results}/>, container);
    });
    expect(container).not.toBeNull();
  });

  it('renders Answer component without crashing', () => {
    var id1 = Object.keys(data.questions.results[0].answers);
    act(() => {
      render(<Answer answer={data.questions.results[0].answers[id1[0]]}/>, container);
    });
    expect(container).not.toBeNull();
  });

  it('renders Question component without crashing', () => {
    act(() => {
      render(<Question questions={data.questions.results[0]}/>, container);
    });
    expect(container).not.toBeNull();
  });

  it('renders Userhelpful component without crashing', () => {
    var id1 = Object.keys(data.questions.results[0].answers);
    act(() => {
      render(<Userhelpful answer={data.questions.results[0].answers[id1[0]]}/>, container);
    });
    expect(container).not.toBeNull();
  });

  it('renders QuestionHelpful component without crashing', () => {
    act(() => {
      render(<QuestionHelpful help={data.questions.results[0].question_helpfulness}/>, container);
    });
    expect(container).not.toBeNull();
  });
});
