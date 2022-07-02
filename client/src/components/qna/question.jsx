import React from 'react';
import QuestionHelpful from './questionHelpful.jsx';

var question = (props) => (
  <div className='q-grid paddingleft paddingbottom'>
    <div className='qabold'>Q:</div>
    <div className='qabold'>Test question </div>
    <QuestionHelpful />
  </div>
);

export default question;