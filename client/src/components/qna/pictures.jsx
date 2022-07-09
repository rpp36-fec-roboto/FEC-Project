import React from 'react';

var picture = (props) => {
  if (props.picture.length > 0) {
    return props.picture.map((pic) => (
      <img src={pic}></img>
    ));
  } else {
    null;
  }
};

export default picture;