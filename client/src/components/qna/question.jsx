import React from 'react';
import QuestionHelpful from './questionHelpful.jsx';

var question = (props) => (
  <div className='qa-paddingleft qa-paddingbottom'>
    <div className='qa-bold qa-float'>Q:</div>
    <div className='qa-bold qa-float'>Test question </div>
    <QuestionHelpful />
  </div>
);

export default question;