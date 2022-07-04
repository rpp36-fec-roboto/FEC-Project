import React, {useState, useEffect} from 'react';

import RelatedProductCard from './RelatedProductCard.jsx';
import sampleData from '../../data/sampleData.js';

var RelatedProductsList = function (props) {
  var productId = props.productId;
  var productInfo = sampleData.productInfo;
  var productStyle = sampleData.productStyle;
  let [relatedProduct, setRelatedProduct] = useState(sampleData.relatedProduct);

  // let products = relatedProduct.map((id) => {
  //   return (
  //     <ul key={id}>
  //       <li style={{ 'listStyleType': 'none' }}>
  //         <RelatedProductCard
  //           list={'relatedProducts'}
  //           productId={id} // send 1st product only to start
  //         />
  //       </li>
  //     </ul>
  //   );
  // });

  // return (
  //   <div>
  //     <h3>RELATED PRODUCTS</h3>
  //     {products}
  //   </div>
  // );

  return (
    <div>
      <h3>RELATED PRODUCTS</h3>
      <RelatedProductCard
        list={'relatedProducts'}
        productId={relatedProduct[0]} // send 1st product only to start
      />
    </div>
  );
};

export default RelatedProductsList;