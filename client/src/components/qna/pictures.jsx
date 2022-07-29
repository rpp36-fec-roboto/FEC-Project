import React from 'react';

var picture = (props) => {
  if (props.picture.length > 0) {
    if (props.picture[0].url) {
      return props.picture.map((pic) => (
        <img className='qa-thumbnail' src={pic.url}></img>
      ));
    } else {
      return props.picture.map((pic) => (
        <img className='qa-thumbnail' src={pic}></img>
      ));
    }
  } else {
    null;
  }
};

export default picture;