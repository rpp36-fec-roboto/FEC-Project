import React, {useState, useEffect} from 'react';

import ActionBtn from './ActionButton.jsx';
import {Images, PrimaryImage} from './Images.jsx';
import Price from './Price.jsx';
import Rating from './Rating.jsx';

import sampleData from '../../data/sampleData.js';
import findDefaultStyle from '../../../../lib/clientHelpers.js';

var RelatedProductCard = function (props) {
  let productId = props.productId;

  // Get productInfo productRating and productStyle
  let productInfo = sampleData.productInfo; // update
  var productRatings = sampleData.reviewsMeta.ratings;
  let productStyle = sampleData.productStyle.results[0]; // update
  let styleId = productStyle.style_id; // update - not yet being utilized

  let category = (productInfo.category).toUpperCase();
  let name = `${productInfo.name}, ${productStyle.name}`;

  return (
    <div className="rp-card">
      <div className="rp-card-container">
        <PrimaryImage productStyle={productStyle} />
        <div className="rp-card-top-right">
          <ActionBtn
            productId={productId}
            listType={props.listType}
            onStarClick={props.onStarClick}
            onXClick={props.onXClick}
          />
        </div>
      </div>

      <div>
        <div>
          {category}
        </div>

        <div>
          <b>{name}</b>
        </div>

        <div>
          <Price productInfo={productInfo} productStyle={productStyle} />
        </div>

        <div>
          <Rating ratings={productRatings}/>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductCard;