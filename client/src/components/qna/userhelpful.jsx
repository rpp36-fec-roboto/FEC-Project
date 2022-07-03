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
      <div className='qa-float' >{props.answer.answerer_name},</div>
      <div className='qa-float' >{date}</div>
      <div className='qa-float' >|</div>
      <div className='qa-float' >Helpful?</div>
      <div className='qa-underline qa-float'>Yes</div>
      <div className='qa-float' >({props.answer.helpfulness})</div>
      <div className='qa-float' >|</div>
      <div className='qa-underline qa-float'>Report</div>
    </div>
  );
};

export default userhelpful;

//               "5986024": {
//                   "id": 5986024,
//                   "body": "I hide in the woods all the time in my camo onesie and no one has ever noticed me!",
//                   "date": "2022-06-09T00:00:00.000Z",
//                   "answerer_name": "sneakyPete",
//                   "helpfulness": 2,
//                   "photos": []
//               },