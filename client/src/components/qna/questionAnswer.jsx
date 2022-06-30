import React from 'react';
import Answer from './answer.jsx';

var questionAnswer = (props) => (
  <div>
    <div>Q: test question</div>
    <Answer />
    <div> by user, date | helpful? Yes (2) | Report</div><br></br>
    <div>Q: test question 2</div>
    <Answer />
    <div> by user, date | helpful? Yes (1) | Report</div>
  </div>
)

export default questionAnswer;