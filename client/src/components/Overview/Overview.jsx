import React, {useState, useEffect} from 'react';
import sampleData from '../../data/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';

import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import Cart from './Cart.jsx';
import OtherInfo from './OtherInfo.jsx';
import ImageGallery from './ImageGallery.jsx';

var Overview = (props) => {

  var productId = props.productId; // props from App level state
  var reviewsMeta = props.reviewsMeta; // props from the App level state
  var productInfo = sampleData.productInfo; // initiate by GET GET /products/:product_id
  var productStyle = sampleData.productStyle; // initiate by GET 'products/:product/styles/'

  // set currentStyle to the default
  const [currentStyle, setStyle] = useState(helper.findDefaultStyle(productStyle));

  // initiate app showing main image as the 1st image
  const [mainImgIndex, setMainImgIndex] = useState(0);

  // not decided on how to change between views
  const [isDefaultView, setIsDefaultView] = useState(true);

  // ComponentDidMount
  useEffect(() => {
  }, []);

  // handle style change
  var handleStyleChange = (style) => {

  };

  // handle mainImgIndex change
  var handleImgThumbnailClick = (imgIndex) => {};

  return (
    <div className="overview-grid">
      <div className="ov-top-row">

        <div className="ov-left-2">
          <ImageGallery
            currentStyle={currentStyle}
            mainImgIndex={mainImgIndex}
            handleImgThumbnailClick={handleImgThumbnailClick}
          />
        </div>

        <div className="ov-right-1">
          <ProductInfo
            productInfo={productInfo}
            rating={helper.calculateRating(reviewsMeta.ratings)}
          />

          <Style
            productStyle={productStyle}
            currentStyle={currentStyle}
            handleStyleChange={handleStyleChange}
          />

          <Cart
            currentStyle={currentStyle}
          />
        </div>

      </div>

      <OtherInfo />
    </div>
  );
};

export default Overview;