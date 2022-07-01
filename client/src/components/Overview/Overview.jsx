import React, {useState, useEffect} from 'react';
import sampleData from '../../data/sampleData.js';
import helper from './helper.js';

import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import AddToCart from './AddToCart.jsx';
import OtherInfo from './OtherInfo.jsx';
import ImageGallery from './ImageGallery.jsx';

var Overview = (props) => {

  var productId = props.productId; // props from App level state
  var reviewsMeta = props.reviewsMeta; // props from the App level state
  var productInfo = sampleData.productInfo; // initiate by GET GET /products/:product_id
  var productStyle = sampleData.productStyle; // initiate by GET 'products/:product/styles/'

  // set currentStyle to the default
  const [currentStyle, setStyle] = useState(helper.findDefaultStyle(productStyle));

  // ComponentDidMount
  useEffect(() => {
  }, []);

  // handle style change
  var handleStyleChange = (style) => {

  };

  return (
    <div className="overview">
      <div className="row-1">

        <div className="col-2-3">
          <ImageGallery
            currentStyle={currentStyle}
          />
        </div>

        <div className="col-1-3">
          <ProductInfo
            productInfo={productInfo}
            rating={helper.calculateRating(reviewsMeta.rating)}
          />

          <Style
            productStyle={productStyle}
            currentStyle={currentStyle}
          />

          <AddToCart
            currentStyle={currentStyle}
          />
        </div>

      </div>

      <div className="row-2">
        <OtherInfo />
      </div>
    </div>
  );
};

export default Overview;