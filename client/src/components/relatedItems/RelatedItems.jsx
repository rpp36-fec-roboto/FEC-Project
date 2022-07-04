import React, {useState, useEffect} from 'react';
import sampleData from '../../data/sampleData.js';

import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

var RelatedItems = function (props) {
  var productId = props.productId;
  var productInfo = sampleData.productInfo;
  var productStyle = sampleData.productStyle;
  var relatedProduct = sampleData.relatedProduct;

  return (
    <div>
      <RelatedProductsList productId={productId} />
      <YourOutfitList />
    </div>
  );
};

export default RelatedItems;