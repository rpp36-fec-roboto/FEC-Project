import React from 'react';

import helper from '../../../../lib/clientHelpers.js';
import Style from './Style.jsx';
import StarRating from '../Sharables/StarRating.jsx';

var ProductInfo = ({ reviewsMeta, productInfo }) => {
  var rating = helper.calculateRating(reviewsMeta.ratings);
  var totalReviews = helper.calculateTotalReviews(reviewsMeta.ratings);

  return (
    <>
      <div className="rating" data-testId="star-rating">
        <StarRating rating={rating} />
        <p className="ov-small-text">&nbsp;&nbsp;<a href="#reviews">Read all {totalReviews} reviews</a></p>{/* links to reviews widget */}
      </div>


      <p className="ov-all-cap ov-grey-text" style={{marginBottom: '0px'}}>{productInfo.category}</p>
      <p className="ov-bold ov-title">{productInfo.name}</p>

    </>
  );
};

export default ProductInfo;