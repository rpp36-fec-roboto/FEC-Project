import React, {useState, useEffect} from 'react';
import axios from 'axios';

import RelatedProductLists from './RelatedProductLists.jsx';
// import YourOutfitList from './YourOutfitList.jsx';

var RelatedItems = (props) => {
  const {
    productId,
    reviewsMeta,
    yourOutfit,
    onStarClick,
    onXClick
  } = props;

  const [productInfo, setProductInfo] = useState({});
  const [productStyle, setProductStyle] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [relatedProductReviews, setRelatedProductReviews] = useState([]);
  const [relatedProductStyles, setRelatedProductStyles] = useState([]);
  const [yourOutfitInfo, setYourOutfitInfo] = useState([]);
  const [yourOutfitReviews, setYourOutfitReviews] = useState([]);
  const [yourOutfitStyles, setYourOutfitStyles] = useState([]);

  const getProductInfo = ((productId, listType) => {
    let productInfoRequest = axios.get(`/products/${productId}`);
    let productStyleRequest = axios.get(`/products/${productId}/styles`);
    let relatedProductRequest = axios.get(`/products/${productId}/related`);

    axios.all([productInfoRequest, productStyleRequest, relatedProductRequest])
      .then(axios.spread((...responses) => {
        setProductInfo(responses[0].data);
        setProductStyle(responses[1].data);
        setRelatedProduct(responses[2].data);
      }))
      .catch( err => { console.log(err); });
  });

  const getRelatedProductInfo = ((products, cb) => {
    let count = 0;
    let relProdInfo = [];
    let relProdReviews = [];
    let relProdStyles = [];

    products.forEach((id) => {
      let productInfoRequest = axios.get(`/products/${id}`);
      let productReviewRequest = axios.get('reviews/meta', {params: { 'product_id': id }});
      let productStyleRequest = axios.get(`/products/${id}/styles`);

      axios.all([productInfoRequest, productReviewRequest, productStyleRequest])
        .then(axios.spread((...responses) => {
          relProdInfo.push(responses[0].data);
          relProdReviews.push(responses[1].data);
          relProdStyles.push(responses[2].data);
        }))
        .then(() => {
          count++;
          if (count === products.length) {
            cb(null, relProdInfo, relProdReviews, relProdStyles);
          }
        })
        .catch( err => { console.log(err); });
    });
  });

  const getYourOutfitInfo = ((products, cb) => {
    let count = 0;
    let outfitInfo = [];
    let outfitReviews = [];
    let outfitStyles = [];

    products.forEach((id) => {
      let productInfoRequest = axios.get(`/products/${id}`);
      let productReviewRequest = axios.get('reviews/meta', {params: { 'product_id': id }});
      let productStyleRequest = axios.get(`/products/${id}/styles`);

      axios.all([productInfoRequest, productReviewRequest, productStyleRequest])
        .then(axios.spread((...responses) => {
          outfitInfo.push(responses[0].data);
          outfitReviews.push(responses[1].data);
          outfitStyles.push(responses[2].data);
        }))
        .then(() => {
          count++;
          if (count === products.length) {
            cb(null, outfitInfo, outfitReviews, outfitStyles);
          }
        })
        .catch( err => { console.log(err); });
    });
  });

  useEffect(() => {
    const listType = 'current';
    getProductInfo(productId, listType);
  }, []);

  useEffect(() => {
    const listType = 'related';
    getRelatedProductInfo(relatedProduct, function(err, relProdInfo, relProdReviews, relProdStyles) {
      if (err) {
        console.log(err);
      } else {
        setRelatedProductInfo(relProdInfo);
        setRelatedProductReviews(relProdReviews);
        setRelatedProductStyles(relProdStyles);
      }
    });
  }, [relatedProduct]);

  useEffect(() => {
    const listType = 'outfit';
    getYourOutfitInfo(yourOutfit, function(err, outfitInfo, outfitReviews, outfitStyles) {
      if (err) {
        console.log(err);
      } else {
        setYourOutfitInfo(outfitInfo);
        setYourOutfitReviews(outfitReviews);
        setYourOutfitStyles(outfitStyles);
      }
    });
  }, [yourOutfit]);

  return (
    <div className="ri-grid">
      <RelatedProductLists
        listType={'relatedProduct'}
        productId={productId}
        productInfo={productInfo}
        productStyle={productStyle}
        relatedProduct={relatedProduct}
        relatedProductInfo={relatedProductInfo}
        relatedProductReviews={relatedProductReviews}
        relatedProductStyles={relatedProductStyles}
        onStarClick={onStarClick}
      />
      <RelatedProductLists
        listType={'yourOutfit'}
        productId={productId}
        productInfo={productInfo}
        productStyle={productStyle}
        yourOutfit={yourOutfit}
        yourOutfitInfo={yourOutfitInfo}
        yourOutfitReviews={yourOutfitReviews}
        yourOutfitStyles={yourOutfitStyles}
        onXClick={onXClick}
      />
    </div>
  );
};

export default RelatedItems;