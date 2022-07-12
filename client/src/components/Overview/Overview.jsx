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
  const productId = props.productId; // props from App level state
  const reviewsMeta = props.reviewsMeta; // props from the App level state
  const yourOutfit = props.yourOutfit;

  // event handler props
  const handleAddToYourOutfit = props.handleAddToYourOutfit;
  const handleRemoveYourOutfit = props.handleRemoveYourOutfit;

  // Shared managed state
  const [productInfo, setProductInfo] = useState(sampleData.productInfo);
  const [productStyle, setProductStyle] = useState(sampleData.productStyle);
  const [currentStyle, setCurrentStyle] = useState(helper.findDefaultStyle(productStyle));

  // ComponentDidMount
  useEffect(() => {
    var productInfoRequest = axios.get(`products/${productId}`);
    var styleRequest = axios.get(`products/${productId}/styles`);

    axios.all([productInfoRequest, styleRequest])
      .then(axios.spread((...responses) => {
        console.dir(responses[0].data);
        console.dir(responses[1].data);
        setProductInfo(responses[0].data);
        setProductStyle(responses[1].data);
        setCurrentStyle(helper.findDefaultStyle(responses[1].data));
      }))
      .catch( err => { console.log(err); });

  }, []);

  // handle style change
  const handleStyleChange = (style) => {
    setCurrentStyle(style);
    setSize('Select Size');
  };

  // IMAGE GALLERY component state and function
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(mainImgIndex);

  // client requests to show up to 7 thumbnails, using 4 to test up/down arrow function
  const maxThumbnails = 4;

  // handle left/right button click on main image
  const handleImgBtnClick = (event) => {
    let newMainImgIndex;

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

  const handleThumbnailScrollUp = (event) => {
    // scroll by 3
    let startIndex = thumbnailStartIndex;
    startIndex -= 3;
    if (startIndex < 0) {
      startIndex = 0;
    }
    setThumbnailStartIndex(startIndex);
  };

  const handleThumbnailScrollDown = (event) => {
    // scroll by 3
    let startIndex = thumbnailStartIndex;
    startIndex += 3;
    setThumbnailStartIndex(startIndex);
  };

  const handleImgThumbnailClick = (imgIndex) => {
    setMainImgIndex(imgIndex);
  };

  const handleImgClick = () => {
    setIsDefaultView(!isDefaultView);
  };

  // CART component state and function
  const [selectedSize, setSize] = useState('Select Size');
  const [selectedQuant, setQuant] = useState(0);

  const handleSelect = (event) => {
    if (event.target.name === 'ov-size') {
      setSize(event.target.value);
      setQuant(1);
    } else {
      setQuant(event.target.value);
    }
  };

  const submitCartRequest = (data) => {
    // post request to server
    axios.post('/cart', data)
      .then(response => {
        setSize('Select Size');
        setQuant(0);
      })
      .catch( err => console.log(err) );
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
            handleThumbnailScrollUp={handleThumbnailScrollUp}
            handleThumbnailScrollDown={handleThumbnailScrollDown}
            handleImgClick={handleImgClick}
          />
        </div>

        {// Only in default view, show product info, style selector and cart
          isDefaultView &&
          <div className="ov-right-1">
            <ProductInfo
              productInfo={productInfo}
              reviewsMeta={reviewsMeta}
            />

            <Style
              productStyle={productStyle}
              currentStyle={currentStyle}
              handleStyleChange={handleStyleChange}
            />

            <Cart
              currentStyle={currentStyle}
              isYourOutfit={helper.isInYourOutfit(productId, yourOutfit)}
              selectedSize={selectedSize}
              selectedQuant={selectedQuant}
              handleSelect={handleSelect}
              submitCartRequest={submitCartRequest}
              handleAddToYourOutfit={handleAddToYourOutfit}
              handleRemoveYourOutfit={handleRemoveYourOutfit}
            />
          </div>}

      </div>

      <div className="ov-bottom-row">
        <OtherInfo productInfo={productInfo}/>
      </div>
    </div>
  );
};

export default Overview;