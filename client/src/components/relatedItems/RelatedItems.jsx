import React, {useState, useEffect} from 'react';
import axios from 'axios';

import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

var RelatedItems = (props) => {
  const productId = props.productId;
  const yourOutfit = props.yourOutfit;

  const [productInfo, setProductInfo] = useState({});
  const [productStyle, setProductStyle] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [relatedProductStyles, setRelatedProductStyles] = useState([]);
  const [yourOutfitInfo, setYourOutfitInfo] = useState([]);
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
    let relProdStyles = [];
    products.forEach((id) => {
      let productInfoRequest = axios.get(`/products/${id}`);
      let productStyleRequest = axios.get(`/products/${id}/styles`);

      axios.all([productInfoRequest, productStyleRequest])
        .then(axios.spread((...responses) => {
          relProdInfo.push(responses[0].data);
          relProdStyles.push(responses[1].data);
        }))
        .then(() => {
          count++;
          if (count === products.length) {
            cb(null, relProdInfo, relProdStyles);
          }
        })
        .catch( err => { console.log(err); });
    });
  });

  const getYourOutfitInfo = ((products, cb) => {
    let count = 0;
    let outfitInfo = [];
    let outfitStyles = [];
    products.forEach((id) => {
      let productInfoRequest = axios.get(`/products/${id}`);
      let productStyleRequest = axios.get(`/products/${id}/styles`);

      axios.all([productInfoRequest, productStyleRequest])
        .then(axios.spread((...responses) => {
          outfitInfo.push(responses[0].data);
          outfitStyles.push(responses[1].data);
        }))
        .then(() => {
          count++;
          if (count === products.length) {
            cb(null, outfitInfo, outfitStyles);
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
    getRelatedProductInfo(relatedProduct, function(err, relProdInfo, relProdStyles) {
      if (err) {
        console.log('error: ', err);
      } else {
        setRelatedProductInfo(relProdInfo);
        setRelatedProductStyles(relProdStyles);
      }
    });
  }, [relatedProduct]);

  useEffect(() => {
    const listType = 'outfit';
    getYourOutfitInfo(yourOutfit, function(err, outfitInfo, outfitStyles) {
      if (err) {
        console.log('error: ', err);
      } else {
        setYourOutfitInfo(outfitInfo);
        setYourOutfitStyles(outfitStyles);
      }
    });
  }, [yourOutfit]);

  return (
    <div className="ri-grid">
      <RelatedProductsList
        productId={productId}
        productInfo={productInfo}
        productStyle={productStyle}
        relatedProduct={relatedProduct}
        relatedProductInfo={relatedProductInfo}
        relatedProductStyles={relatedProductStyles}
        onStarClick={props.onStarClick}
      />
      <YourOutfitList
        productId={productId}
        productInfo={productInfo}
        productStyle={productStyle}
        yourOutfit={yourOutfit}
        yourOutfitInfo={yourOutfitInfo}
        yourOutfitStyles={yourOutfitStyles}
        onXClick={props.onXClick}
      />
    </div>
  );
};

export default RelatedItems;