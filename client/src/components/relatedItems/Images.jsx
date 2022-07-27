import React from 'react';
import noImg from '../../assets/no-image.jpeg';

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
  const { productStyle } = props;
  let image, name;

  if (productStyle !== undefined) {
    image = productStyle.photos[0].url;
    name = productStyle.name;
  }

  return (
    <img src={image || noImg} alt={name} className="rp-card-image"></img>
  );
};

export {
  Images,
  PrimaryImage
};