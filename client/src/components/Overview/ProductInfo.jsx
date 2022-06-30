import React from 'react';

import Style from './Style.jsx';

var ProductInfo = (props) => {
  var rating = props.rating;
  var productInfo = props.productInfo; // initiate by GET GET /products/:product_id

  return (
    <div className="col-1-3">
      <div className="rating">
        <p>rating: {rating}/5</p>
        <a>Read all reviews</a> {/* links to reviews widget */}
      </div>

      <div>
        <p>{productInfo.category}</p>
        <h3>{productInfo.name}</h3>
      </div>
    </div>
  );

  // star rating
  // product category
  // product title
  // price: style specific, may be on sale
  // product overview: may be null
  // add to Cart
  // star to click to add to MyOutfit
};

export default ProductInfo;