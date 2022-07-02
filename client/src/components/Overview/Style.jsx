import React from 'react';

var Style = (props) => {

  var currentStyle = props.currentStyle;
  var originalPrice = currentStyle['original_price'];
  var salePrice = currentStyle['sale_price'];

  return (
    <div>
      <div>price: based on style selected</div>
      <div>
        4/roll thumnails of styles, clickable images,
        no effect when clicking current selected.
        Checkmark present at current selected style
      </div>
    </div>
  );
};

export default Style;