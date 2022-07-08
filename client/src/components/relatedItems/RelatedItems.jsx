import React, {useState, useEffect} from 'react';
import axios from 'axios';
import sampleData from '../../data/sampleData.js';

import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';

var RelatedItems = function (props) {
  const productId = props.productId;
  const yourOutfit = [71698, 71699, 71704, 71703];
  // const yourOutfit = props.yourOutfit;
  // const isYourOutfit = props.isYourOutfit;

  // Anticipate passing product Information and Style for comparison to other products
  const [productInfo, setProductInfo] = useState(sampleData.productInfo);
  const [productStyle, setProductStyle] = useState(sampleData.productStyle);
  const [relatedProduct, setRelatedProduct] = useState([]);
  // Not passing your outfit yet, use dummmy

  const [relatedProductInfo, setRelatedProductInfo] = useState([]);
  const [relatedProductStyles, setRelatedProductStyles] = useState([]);
  const [yourOutfitInfo, setYourOutfitInfo] = useState([]);
  const [yourOutfitStyles, setYourOutfitStyles] = useState([]);

  // Currently runs on the first render -
  // update second parameter so it renders any time any dependency value changes
  useEffect(() => {
    var productInfoRequest = axios.get(`/products/${productId}`);
    var styleRequest = axios.get(`/products/${productId}/styles`);
    var relatedProductRequest = axios.get(`/products/${productId}/related`);

    axios.all([productInfoRequest, styleRequest, relatedProductRequest])
      .then(axios.spread((...responses) => {
        setProductInfo(responses[0].data);
        setProductStyle(responses[1].data);
        setRelatedProduct(responses[2].data);
      }))
      .catch( err => { console.log(err); });

  }, []);

  return (
    <div className="ri-grid">
      <RelatedProductsList
        productId={productId}
        productInfo={productInfo}
        productStyle={productStyle}
        relatedProduct={relatedProduct}
      />
      <YourOutfitList productId={productId} yourOutfit={yourOutfit}/>
    </div>
  );
};

export default RelatedItems;