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

  // not decided on how to change between views
  const [isDefaultView, setIsDefaultView] = useState(true);

  // set currentStyle to the default
  const [currentStyle, setStyle] = useState(helper.findDefaultStyle(productStyle));

  // initiate app showing main image as the 1st image
  const [mainImgIndex, setMainImgIndex] = useState(0);

  // client's request of showing up to 7 thumbnails, using 4 to test up/down arrow function
  var maxThumbnails = 4;
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(mainImgIndex);

  // ComponentDidMount
  useEffect(() => {
  }, []);

  // handle style change
  var handleStyleChange = (style) => {

  };

  // handle left/right button click on main image
  var handleImgBtnClick = (event) => {
    var newMainImgIndex;

    if (event.target.name === 'left-click') {
      newMainImgIndex = mainImgIndex - 1;
      if (newMainImgIndex < thumbnailStartIndex) {
        setThumbnailStartIndex(newMainImgIndex);
      }

      setMainImgIndex(newMainImgIndex);
    } else {
      newMainImgIndex = mainImgIndex + 1;
      if (newMainImgIndex >= thumbnailStartIndex + maxThumbnails) {
        setThumbnailStartIndex(newMainImgIndex);
      }
      setMainImgIndex(newMainImgIndex);
    }

  };

  // handle thumbnail img click
  var handleImgThumbnailClick = (imgIndex) => {
    setMainImgIndex(imgIndex);
  };

  var handleThumbnailScroll = (event) => {
    // scroll by 3
    var startIndex = thumbnailStartIndex;
    if (event.target.name === 'down-click') {
      startIndex += 3;
    } else {
      startIndex -= 3;
    }

    if (startIndex < 0) {
      startIndex = 0;
    }

    setThumbnailStartIndex(startIndex);
  };

  return (
    <div className="overview-grid">
      <div className="ov-top-row">

        <div className="ov-left-2">
          <ImageGallery
            currentStyle={currentStyle}
            mainImgIndex={mainImgIndex}
            maxThumbnails={maxThumbnails}
            thumbnailStartIndex={thumbnailStartIndex}
            handleImgBtnClick={handleImgBtnClick}
            handleImgThumbnailClick={handleImgThumbnailClick}
            handleThumbnailScroll={handleThumbnailScroll}
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