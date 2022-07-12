import React, {useState, useEffect} from 'react';

import ActionBtn from './ActionButton.jsx';
import {Images, PrimaryImage} from './Images.jsx';
import Price from './Price.jsx';
import Rating from './Rating.jsx';

import sampleData from '../../data/sampleData.js';
import findDefaultStyle from '../../../../lib/clientHelpers.js';

var RelatedProductCard = function (props) {
  const {
    listType,
    productId,
    productInfo,
    productStyle,
    onStarClick,
    onXClick
  } = props;

  const onClickAction = listType === 'relatedProduct'
    ? onStarClick
    : onXClick;

  // let productId = props.productId;
  // Get productInfo productRating and productStyle
  // productInfo = sampleData.productInfo; // update
  // console.log('RP sample: ', productInfo);
  // let productInfo = props.productInfo;
  // console.log('RPC: ', productInfo);
  var productRatings = sampleData.reviewsMeta.ratings;
  // let productStyle = sampleData.productStyle.results[Math.floor(Math.random() * 6)]; // update
  // let productStyle = sampleData.productStyle.results[0]; // update
  // let productStyle = props.productStyle.results[0];
  // let styleId = productStyle.style_id; // update - not yet being utilized

  // need to bring selected style in through props
  let category, name, styleName;

  if (productInfo !== undefined) {
    category = productInfo.category || '';
    name = productInfo.name || '';
  }

  return (
    <div className="rp-card-container">
      <div className="rp-card">
        <PrimaryImage productStyle={productStyle} />
        <div className="rp-card-top-right">
          <ActionBtn
            listType={listType}
            productId={productId}
            onClickAction={onClickAction}
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