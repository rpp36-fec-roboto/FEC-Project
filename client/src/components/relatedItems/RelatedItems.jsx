import React, {useState, useEffect} from 'react';
import axios from 'axios';

import RelatedProductLists from './RelatedProductLists.jsx';

var RelatedItems = (props) => {
  const {
    productId,
    relatedProduct,
    yourOutfit,
    onCardClick,
    onStarClick,
    onXClick
  } = props;

  const [productInfo, setProductInfo] = useState([]);
  const [productReviews, setProductReviews] = useState([]);
  const [productStyles, setProductStyles] = useState([]);

  let allProduct = Array.from(new Set([productId, ...relatedProduct, ...yourOutfit])).sort();

  const getProductInfo = ((products) => {
    let count = 0;
    let addProdInfo = [];
    let addProdReviews = [];
    let addProdStyles = [];

    products.forEach((id) => {
      let productInfoRequest = axios.get(`/products/${id}`);
      let productReviewRequest = axios.get('reviews/meta', {params: { 'product_id': id }});
      let productStyleRequest = axios.get(`/products/${id}/styles`);

      axios.all([productInfoRequest, productReviewRequest, productStyleRequest])
        .then(axios.spread((...responses) => {
          addProdInfo.push(responses[0].data);
          addProdReviews.push(responses[1].data);
          addProdStyles.push(responses[2].data);
        }))
        .then(() => {
          count++;
          if (count === products.length && count === addProdInfo.length && count === addProdReviews.length && count === addProdStyles.length) {
            addProdInfo = [...productInfo, ...addProdInfo];
            addProdReviews = [...productReviews, ...addProdReviews];
            addProdStyles = [...productStyles, ...addProdStyles];
            setProductInfo(addProdInfo);
            setProductReviews(addProdReviews);
            setProductStyles(addProdStyles);
          }
        })
        .catch( err => { console.log(err); });
    });
  });

  useEffect(() => {
    let addItems = [];
    for (var i = 0; i < allProduct.length; i++) {
      let addItem = productInfo.filter((prod) => prod.id === allProduct[i]);
      if (addItem.length === 0) {
        addItems.push(allProduct[i]);
      }
    }
    if (addItems.length > 0) {
      getProductInfo(addItems);
    }
  }, [JSON.stringify(allProduct)]);

  return (
    <div className="ri-grid">
      <RelatedProductLists
        listType={'relatedProduct'}
        productId={productId}
        productInfo={productInfo}
        productReviews={productReviews}
        productStyles={productStyles}
        relatedProduct={relatedProduct}
        onCardClick={onCardClick}
        onStarClick={onStarClick}
      />
      <RelatedProductLists
        listType={'yourOutfit'}
        productId={productId}
        productInfo={productInfo}
        productReviews={productReviews}
        productStyles={productStyles}
        yourOutfit={yourOutfit}
        onCardClick={onCardClick}
        onXClick={onXClick}
      />
    </div>
  );
};

export default RelatedItems;