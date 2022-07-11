import React from 'react';

var Price = function (props) {
  const {
    productInfo,
    productStyle
  } = props;

  if (productInfo === undefined || productStyle === undefined) {
    return (
      <div></div>
    );
  }

  let defaultPrice = productInfo.default_price; // reflect default style - clarify as some styles have diffenent original prices
  let originalPrice = productStyle.original_price; // not sure what to use; results[5]
  let salePrice = productStyle.sale_price;

  // Need to factor for styles, talk to Ziqian to understand how she's handling that; may need to manage that state at the App level
  // for now, disable sale pricing
  salePrice = null;

  if (!salePrice) {
    return <p><span>${defaultPrice}</span></p>;
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