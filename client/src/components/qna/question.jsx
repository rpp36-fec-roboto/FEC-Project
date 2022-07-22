import React from 'react';
import QuestionHelpful from './questionHelpful.jsx';

var question = (props) => (
  <div className='qa-paddingleft qa-paddingbottom'>
    <div className='qa-bold qa-float'>Q:</div>
    <div className='qa-bold qa-float'>{props.questions.question_body} </div>
    <QuestionHelpful
      help={props.questions.question_helpfulness}
      yesQuestion={props.yesQuestion}
      addAnswer={props.addAnswer}
      body={props.questions.question_body}
      qid={props.questions.question_id}/>
  </div>
);

export default question;