import React, {useState, useEffect} from 'react';

import ActionBtn from './ActionButton.jsx';
import {Images, PrimaryImage} from './Images.jsx';
import Price from './Price.jsx';
import Rating from './Rating.jsx';
import findDefaultStyle from '../../../../lib/clientHelpers.js';

var RelatedProductCard = function (props) {
  const {
    listType,
    productId,
    productInfo,
    productRatings,
    productStyle,
    onCardClick,
    onStarClick,
    onXClick
  } = props;

  let prodRatings = productRatings
    ? productRatings.ratings
    : null;

  const onClickAction = listType === 'relatedProduct'
    ? onStarClick
    : onXClick;

  // need to capture selected style
  let category, name, styleName;

  if (productInfo !== undefined) {
    category = productInfo.category || '';
    name = productInfo.name || '';
  }

  return (
    <div className="rp-card-container">
      <div className="rp-card" onClick={() => onCardClick(productId.toString())}>
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
          <Rating ratings={prodRatings}/>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductCard;