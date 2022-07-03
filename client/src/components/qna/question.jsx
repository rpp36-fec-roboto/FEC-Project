import React from 'react';
import QuestionHelpful from './questionHelpful.jsx';

var question = (props) => (
  <div className='paddingleft paddingbottom'>
    <div className='qabold qa-float'>Q:</div>
    <div className='qabold qa-float'>Test question </div>
    <QuestionHelpful />
  </div>
);

export default question;