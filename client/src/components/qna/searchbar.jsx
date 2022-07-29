import React from 'react';

var searchBar = (props) => (
  <div>
    <div className='qa-paddingleft'>
      <input className='qa-bar qa-bold' data-testid="search" type="search" maxLength="150" onChange={props.query} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."></input>
    </div>
  </div>
);

export default searchBar;