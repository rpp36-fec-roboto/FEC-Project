import React from 'react';

var bottomButtons = (props) => (
  <div className='qa-paddingleft'>
    {props.questions.length > 2 ?
      <button className='morequestions' onClick={(e) => { props.more(e); }}>MORE ANSWERED QUESTIONS</button> :
      <div></div>}
    <button onClick={(e) => { props.addQuestion(e); }}>ADD A QUESTION +</button>
  </div>
);

export default bottomButtons;