import React, {useState, useEffect} from 'react';
import sampleData from '../../data/sampleData.js';

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

  // set styleId to the default
  const [currentStyle, setStyle] = useState(productStyle.results.find(style => style['default?']));

  // ComponentDidMount
  useEffect(() => {
  }, []);

  // find default style id
  var findDefaultStyle = (productStyle) => {
    console.log(productStyle.results.find(style => style['default?']));
    return productStyle.results.find(style => style['default?']);
  };

  // takes the rating object, returns average rating
  var calculateRating = (ratings) => {
  };

  // handle style change
  var handleStyleChange = (style) => {

  };

  return (
    <div className="overview">
      <div classaName="row-1">

        <div classaName="col-2-3">
          <ImageGallery
            currentStyle={currentStyle}
          />
        </div>

        <div className="col-1-3">
          <ProductInfo
            productInfo={productInfo}
            rating={calculateRating(reviewsMeta.ratings)}
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