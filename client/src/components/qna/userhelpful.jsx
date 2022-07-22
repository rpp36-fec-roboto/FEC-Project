import React from 'react';

var userhelpful = (props) => {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var d = new Date(props.answer.date);
  var day = d.getDate();
  var month = d.getMonth();
  var year = d.getFullYear();
  var date = `${months[month]} ${day + 1}, ${year}`;



  return (
    <div className='qa-paddingleft qa-userhelpful'>
      <div className='qa-float' >by</div>
      {props.answer.answerer_name === 'Seller' ?
        <div className='qa-float qa-bold' >{props.answer.answerer_name},</div> :
        <div className='qa-float' >{props.answer.answerer_name},</div>}
      <div className='qa-float' >{date}</div>
      <div className='qa-float' >|</div>
      <div className='qa-float' >Helpful?</div>
      {props.answer.id !== undefined ?
        <div className='qa-underline qa-float' onClick={(e) => { props.yesAnswer(props.answer.id); }}>Yes</div> :
        <div className='qa-underline qa-float' onClick={(e) => { props.yesAnswer(props.answer['answer_id']); }}>Yes</div>}
      <div className='qa-float' >({props.answer.helpfulness})</div>
      <div className='qa-float' >|</div>
      {props.answer.id !== undefined ?
        <div className={`qa-underline qa-float ${props.answer.id}`} onClick={(e) => { props.reportAnswer(props.answer.id); }}>Report</div> :
        <div className={`qa-underline qa-float ${props.answer['answer_id']}`} onClick={(e) => { props.reportAnswer(props.answer['answer_id']); }}>Report</div>}
    </div>
  );
};

export default userhelpful;