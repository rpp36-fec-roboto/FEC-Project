import React, {useState, useEffect} from 'react';
import sampleData from '../../data/sampleData.js';

import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

var RelatedItems = function (props) {
  const productId = props.productId;
  const productInfo = sampleData.productInfo;
  const productStyle = sampleData.productStyle;
  const relatedProduct = sampleData.relatedProduct;
  // Not passing your outfit yet, use dummmy
  var yourOutfit = [71698, 71699, 71704, 71703];

  return (
    <div className="ri-grid">
      <RelatedProductsList productId={productId} />
      <YourOutfitList productId={productId} yourOutfit={yourOutfit}/>
    </div>
  );
};

export default RelatedItems;