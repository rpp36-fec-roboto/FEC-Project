import React, {useState, useEffect} from 'react';
import axios from 'axios';
import sampleData from '../../data/sampleData.js';
import helper from '../../../../lib/clientHelpers.js';

import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import Cart from './Cart.jsx';
import OtherInfo from './OtherInfo.jsx';
import ImageGallery from './ImageGallery.jsx';

var Overview = (props) => {
  // data props
  var productId = props.productId; // props from App level state
  var reviewsMeta = props.reviewsMeta; // props from the App level state
  var isYourOutfit = props.isYourOutfit;

  // event handler props
  var handleYourOutfitStarClick = props.handleYourOutfitStarClick;

  // Shared managed state
  const [productInfo, setProductInfo] = useState(sampleData.productInfo);
  const [productStyle, setProductStyle] = useState(sampleData.productStyle);
  const [currentStyle, setCurrentStyle] = useState(helper.findDefaultStyle(productStyle));

  // ComponentDidMount
  useEffect(() => {
    var productInfoRequest = axios.get(`/products/${productId}`);
    var styleRequest = axios.get(`/products/${productId}/styles`);

    axios.all([productInfoRequest, styleRequest])
      .then(axios.spread((...responses) => {
        console.dir(responses[0].data);
        console.dir(responses[1].data);
        setProductInfo(responses[0].data);
        setProductStyle(responses[1].data);
      }))
      .catch( err => { console.log(err); });

  }, []);

  // handle style change
  var handleStyleChange = (style) => {
    setCurrentStyle(style);
    setSize('Select Size');
  };

  // IMAGE GALLERY component state and function
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(mainImgIndex);

  // client requests to show up to 7 thumbnails, using 4 to test up/down arrow function
  var maxThumbnails = 4;

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

  var handleImgThumbnailClick = (imgIndex) => {
    setMainImgIndex(imgIndex);
  };

  var handleImgClick = () => {
    setIsDefaultView(!isDefaultView);
  };

  // CART component state and function
  const [selectedSize, setSize] = useState('Select Size');
  const [selectedQuant, setQuant] = useState(0);

  var submitCartRequest = () => {
    // post request to server

  };

  var handleSelect = (event) => {
    if (event.target.name === 'ov-size') {
      setSize(event.target.value);
    } else {
      setQuant(event.target.value);
    }
  };

  return (
    <div className="overview-grid">
      <div className={`ov-top-row-${isDefaultView ? 'default' : 'expended'}`}>

        <div className="ov-left-2">
          <ImageGallery
            currentStyle={currentStyle}
            mainImgIndex={mainImgIndex}
            maxThumbnails={maxThumbnails}
            thumbnailStartIndex={thumbnailStartIndex}
            handleImgBtnClick={handleImgBtnClick}
            handleImgThumbnailClick={handleImgThumbnailClick}
            handleThumbnailScroll={handleThumbnailScroll}
            handleImgClick={handleImgClick}
          />
        </div>

        {// Only in default view, show product info, style selector and cart
          isDefaultView &&
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
              isYourOutfit={isYourOutfit}
              selectedSize={selectedSize}
              selectedQuant={selectedQuant}
              handleSelect={handleSelect}
              submitCartRequest={submitCartRequest}
              handleYourOutfitStarClick={handleYourOutfitStarClick}
            />
          </div>}

      </div>

      <OtherInfo
        productInfo={productInfo}/>
    </div>
  );
};

export default Overview;