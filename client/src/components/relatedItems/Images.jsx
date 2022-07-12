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
  const { productStyle } = props;
  let image, name;

  if (productStyle !== undefined) {
    let defaultStyle = productStyle.results.filter((style) => style['default?'] === true); // forced selection, ensure proper photo is selected
    if (defaultStyle.length > 0) {
      image = defaultStyle[0].photos[0].url;
      name = defaultStyle[0].name;
    } else {
      // What to do if there's no default style? Chose first url associated with first style to start
      image = productStyle.results[0].photos[0].url;
      name = productStyle.results[0].name;
    }
  }

  return (
    <img src={image} alt={name} className="rp-card-image"></img>
  );
};

export {
  Images,
  PrimaryImage
};