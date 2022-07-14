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

import App from '../../App.jsx';
import Qna from './qna.jsx';
import QuestionAnswer from './questionAnswer.jsx';
import BottomButtons from './bottomButtons.jsx';
import Answer from './answer.jsx';
import Question from './question.jsx';
import Userhelpful from './userhelpful.jsx';
import QuestionHelpful from './questionHelpful.jsx';
import data from '../../data/sampleData.js';
import AddAnswer from './addAnswer.jsx';
import Pictures from './pictures.jsx';
import Searchbar from './searchbar.jsx';



describe('Q&A Component', () => {

  beforeEach(() => {
    render(<Qna />);
  });

  it('renders Q&A component without crashing', () => {
    let title = screen.getByText('QUESTION & ANSWERS');
    expect(title).toBeInTheDocument();
  });

});


describe('Questions & Answers Component', () => {

  beforeEach(() => {
    render(<QuestionAnswer questions={data.questions.results} />);
  });

  it('renders QuestionAnswer component without crashing', () => {
    let question = screen.getByRole('Question');
    expect(question).toBeInTheDocument();
  });
});


describe('Bottom Buttons Component', () => {

  beforeEach(() => {
    render(<BottomButtons questions={data.questions.results}/>);
  });

  it('renders BottomButtons component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});


describe('Answer Component', () => {

  beforeEach(() => {
    var id1 = Object.keys(data.questions.results[0].answers);
    render(<Answer answer={data.questions.results[0].answers[id1[0]]}/>);
  });

  it('renders Answer component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});



describe('Question Component', () => {

  beforeEach(() => {
    render(<Question questions={data.questions.results[0]}/>);
  });

  it('renders Question component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});


describe('Userhelpful Component', () => {


  beforeEach(() => {
    var id1 = Object.keys(data.questions.results[0].answers);
    render(<Userhelpful answer={data.questions.results[0].answers[id1[0]]}/>);
  });

  it('renders Userhelpful component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});


describe('QuestionHelpful Component', () => {

  beforeEach(() => {
    render(<QuestionHelpful help={data.questions.results[0].question_helpfulness}/>);
  });

  it('renders QuestionHelpful component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});



describe('AddAnswer Component', () => {

  beforeEach(() => {
    render(<AddAnswer />);
  });

  it('renders AddAnswer component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});



describe('Pictures Component', () => {

  beforeEach(() => {
    var id1 = Object.keys(data.questions.results[0].answers);
    render(<Pictures picture={data.questions.results[0].answers[id1[0]].photos}/>);
  });

  it('renders Pictures component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});



describe('Searchbar Component', () => {

  beforeEach(() => {
    render(<Searchbar />);
  });

  it('renders Searchbar component without crashing', () => {
    expect(screen).not.toBeNull();
  });
});



