import React from 'react';

var answer = (props) => {
  return (
    <div className='qa-paddingleft qa-paddingbottom qa-paddingtop'>
      <div className='qa-bold qa-float'>A:</div>
      <div>{props.answer.body}</div>
    </div>
  );
};

export default answer;