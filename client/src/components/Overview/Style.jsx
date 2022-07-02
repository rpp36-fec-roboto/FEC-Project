import React from 'react';

var Style = (props) => {

  var currentStyle = props.currentStyle;

  var price = (currentStyle) => {
    var originalPrice = currentStyle['original_price'];
    var salePrice = currentStyle['sale_price'];

    if (!salePrice) {
      return <p><span>${originalPrice}</span></p>;
    } else {
      return (
        <p>
          <span>${salePrice}</span>
          <span style={{ 'text-decoration': 'line-through' }}>${originalPrice}</span>
        </p>
      );
    }
  };

  return (
    <div>
      <div>{price(currentStyle)}</div>
      <div>
        4/roll thumnails of styles, clickable images,
        no effect when clicking current selected.
        Checkmark present at current selected style
      </div>
    </div>
  );
};

export default Style;