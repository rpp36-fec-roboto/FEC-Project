import React from 'react';

var bottomButtons = (props) => {
  if (props.questions.length > 2) {
    return (
      <div className='qa-paddingleft'>
        <button className='morequestions' onClick={(e) => { props.more(e); }}>MORE ANSWERED QUESTIONS</button>
        <button onClick={(e) => { props.addQuestion(e); }}>ADD A QUESTION +</button>
      </div>
    );
  } else {
    return (
      <div className='qa-paddingleft'>
        <button onClick={(e) => { props.addQuestion(e); }}>ADD A QUESTION +</button>
      </div>
    );
  }
};

export default bottomButtons;