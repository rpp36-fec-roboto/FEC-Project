import React from 'react';

import helper from '../../../../lib/clientHelpers.js';
import Style from './Style.jsx';
import StarRating from '../Sharables/StarRating.jsx';

var ProductInfo = ({ reviewsMeta, productInfo }) => {
  var rating = helper.calculateRating(reviewsMeta.ratings);
  var totalReviews = helper.calculateTotalReviews(reviewsMeta.ratings);

  return (
    <>
      <div className="rating">
        <StarRating rating={rating} />
        <a href="#reviews">Read all {totalReviews} reviews</a> {/* links to reviews widget */}
      </div>


      <p>{productInfo.category}</p>
      <h3>{productInfo.name}</h3>

    </>
  );
};

export default ProductInfo;