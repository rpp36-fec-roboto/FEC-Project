import React from 'react';

// Future Enhancement - enable users to scroll through additional images associated with a related product
var Images = function (props) {
  let image = props.images.photos[0].url; // forced selection, ensure proper photo is selected

  return (
    <div>
      <img src={image}></img>
    </div>
  );
};

var PrimaryImage = function (props) {
  let image = props.productStyle.photos[0].url; // forced selection, ensure proper photo is selected

  return (
    <img src={image} alt="placeholder" style={{ width: '100%' }}></img>
  );
};

export {
  Images,
  PrimaryImage
};