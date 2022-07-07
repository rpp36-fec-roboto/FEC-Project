import React from 'react';

var bottomButtons = (props) => {
  if (props.questions.length > 2) {
    return (
      <div className='qa-paddingleft'>
        <button>MORE ANSWERED QUESTIONS</button>
        <button>ADD A QUESTION +</button>
      </div>
    );
  } else {
    return (
      <div className='qa-paddingleft'>
        <button>ADD A QUESTION +</button>
      </div>
    );
  }
};

export default bottomButtons;