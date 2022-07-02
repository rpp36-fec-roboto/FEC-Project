import React from 'react';

var searchBar = (props) => (
  <div>
    <div className='paddingleft'>QUESTION & ANSWERS</div><br></br>
    <div className='paddingleft'>
      <input className='bar qabold' type="search" maxLength="150" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
    </div>
  </div>
);

export default searchBar;