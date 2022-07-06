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

  // var productInfo = sampleData.productInfo; // initiate by GET /products/:product_id
  // var productStyle = sampleData.productStyle; // initiate by GET 'products/:product/styles/'

  const [productInfo, setProductInfo] = useState(sampleData.productInfo);
  const [productStyle, setProductStyle] = useState(sampleData.productStyle);
  const [currentStyle, setCurrentStyle] = useState(helper.findDefaultStyle(productStyle));
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [mainImgIndex, setMainImgIndex] = useState(0);

  // client's request of showing up to 7 thumbnails, using 4 to test up/down arrow function
  var maxThumbnails = 4;
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(mainImgIndex);

  // ComponentDidMount
  useEffect(() => {
    // make get request to server for ProductInfo and ProductStyle
    var params = { 'product_id': productId };
    var productInfoRequest = axios.get('/products', { params });
    var styleRequest = axios.get('/products/styles', { params });

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

  // handle thumbnail img click
  var handleImgThumbnailClick = (imgIndex) => {
    setMainImgIndex(imgIndex);
  };

  // handle main image click
  var handleImgClick = () => {
    setIsDefaultView(!isDefaultView);
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