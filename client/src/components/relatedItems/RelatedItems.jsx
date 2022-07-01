import React from 'react';
import RelatedProducts from './RelatedProducts.jsx';
import YourOutfit from './YourOutfit.jsx';

var RelatedItems = function (props) {
  return (
    <div>
      <RelatedProducts />
      <YourOutfit />
    </div>
  );
};

export default RelatedItems;