import React from 'react';
import QuestionHelpful from './questionHelpful.jsx';

var question = (props) => (
  <div className='qa-paddingleft qa-paddingbottom'>
    <div className='qa-bold qa-float'>Q:</div>
    <div className='qa-bold qa-float'>{props.questions.question_body} </div>
    <QuestionHelpful help={props.questions.question_helpfulness} />
  </div>
);

export default question;

// "question_id": 641727,
//           "question_body": "Would this work well for deer hunting? ",
//           "question_date": "2022-06-09T00:00:00.000Z",
//           "asker_name": "Tyler93",
//           "question_helpfulness": 4,
//           "reported": false,