import React from 'react';

import Style from './Style.jsx';

var ProductInfo = (props) => {
  var rating = props.rating;
  var productInfo = props.productInfo; // initiate by GET GET /products/:product_id

  return (
    <div className="col-1-3">
      <div className="rating">
        <p>Star rating: {rating}/5</p>
        <a>Read all reviews</a> {/* links to reviews widget */}
      </div>

      <div>
        <p>{productInfo.category}</p>
        <h3>{productInfo.name}</h3>
      </div>
    </div>
  );
};

export default ProductInfo;