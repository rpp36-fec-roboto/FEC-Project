import React from 'react';

var questionHelpful = (props) => (
  <div className='qa-qhelpful '>
    <div className='qa-float'>Helpful?</div>
    <div className='qa-underline qa-float' data-testid={`yesquestion${props.qid}`} onClick={(e) => { props.yesQuestion(props.qid, props.help); }} >Yes</div>
    <div className={`qa-float help ${props.qid}`} data-testid={`yes${props.qid}`}>({props.help})</div>
    <div className='qa-float'> | </div>
    <div className={`qa-underline qa-float addanswer ${props.qid}`} data-testid={`addanswer${props.qid}`} onClick={(e) => { props.addAnswer(props.qid, props.body); }} > Add Answer</div>
  </div>
);

export default questionHelpful;

