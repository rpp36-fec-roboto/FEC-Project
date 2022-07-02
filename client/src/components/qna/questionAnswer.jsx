import React from 'react';
import Answer from './answer.jsx';
import Question from './question.jsx';

var questionAnswer = (props) => (
  <div>
    <Question />
    <Answer />
    <div className='paddingleft'> by user, date | helpful? Yes (2) | Report</div><br></br>


    <Question />
    <Answer />
    <div className='paddingleft'> by user, date | helpful? Yes (1) | Report</div>
  </div>
);

export default questionAnswer;