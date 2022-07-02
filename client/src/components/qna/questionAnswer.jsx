import React from 'react';
import Answer from './answer.jsx';
import Question from './question.jsx';
import Userhelpful from './userhelpful.jsx';

var questionAnswer = (props) => (
  <div>
    <Question />
    <Answer />
    <Userhelpful /><br></br>

    <Question />
    <Answer />
    <Userhelpful />
  </div>
);

export default questionAnswer;