import React from 'react';

var questionHelpful = (props) => (
  <div className='qa-qhelpful '>
    <div className='qa-float'>Helpful?</div>
    <div className='qa-underline qa-float' onClick={(e) => { props.yesQuestion(props.qid); }} >Yes</div>
    <div className='qa-float'>({props.help})</div>
    <div className='qa-float'> | </div>
    <div className='qa-underline qa-float' onClick={(e) => { props.addAnswer(props.qid); }} > Add Answer</div>
  </div>
);

export default questionHelpful;

