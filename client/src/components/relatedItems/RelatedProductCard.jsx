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
    productStyles,
    onCardClick,
    onStarClick,
    onXClick
  } = props;

  // styleId not currently passed in as prop
  // declare it undefined, anticipation of future enhancement
  let category, name, productStyle, styleId, styleName;

  if (productStyles !== undefined) {
    let defaultStyle = styleId !== undefined
      ? productStyles.results.filter((style) => style['style_id'] === styleId)
      : productStyles.results.filter((style) => style['default?'] === true);

    productStyle = defaultStyle.length > 0
      ? defaultStyle[0]
      : productStyles.results[0];
  }

  let prodRatings = productRatings
    ? productRatings.ratings
    : null;

  const onClickAction = listType === 'relatedProduct'
    ? onStarClick
    : onXClick;

  if (productInfo !== undefined) {
    category = productInfo.category || '';
    name = productInfo.name || '';
  }

  return (
    <div className="rp-card-container">
      <div className="rp-card-top-right">
        <ActionBtn
          listType={listType}
          productId={productId}
          onClickAction={onClickAction}
        />
      </div>
      <div className="rp-card" onClick={() => onCardClick(productId.toString())}>
        <PrimaryImage productStyle={productStyle} />
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