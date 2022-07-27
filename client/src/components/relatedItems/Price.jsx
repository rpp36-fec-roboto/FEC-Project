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

  let defaultPrice = productInfo.default_price;
  let originalPrice = productStyle.original_price;
  let salePrice = productStyle.sale_price;

  if (!salePrice) {
    return <p><span>${defaultPrice}</span></p>;
  } else {
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