import React from 'react';

import helper from '../../../../lib/clientHelpers.js';
import Style from './Style.jsx';

var ProductInfo = ({ reviewsMeta, productInfo }) => {
  var rating = helper.calculateRating(reviewsMeta.ratings);

  return (
    <div>
      <div className="rating">
        <span>Star rating: {rating}/5 </span>
        <a href="#">Read all reviews</a> {/* links to reviews widget */}
      </div>

      <div>
        <p>{productInfo.category}</p>
        <h3>{productInfo.name}</h3>
      </div>
    </div>
  );
};

export default ProductInfo;