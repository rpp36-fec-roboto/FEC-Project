import React from 'react';

var Price = function (props) {
  let defaultPrice = props.productInfo.default_price; // reflect default style - clarify as some styles have diffenent original prices
  let originalPrice = props.productStyle.original_price; // not sure what to use; results[5]
  let salePrice = props.productStyle.sale_price;

  if (!salePrice) {
    return <p><span>${originalPrice}</span></p>;
  } else {
    {/* uss CSS instead of styles listed */}
    return (
      <div>
        <span style={{ 'color': 'red'}}>${salePrice}</span>
        <span>&emsp;</span>
        <span style={{ 'textDecoration': 'line-through' }}>${originalPrice}</span>
      </div>
    );
  }
};

export default Price;