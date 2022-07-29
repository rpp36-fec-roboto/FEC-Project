import React, {useState, useEffect} from 'react';
import axios from 'axios';
import helper from '../../../../lib/clientHelpers.js';

import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import Cart from './Cart.jsx';
import OtherInfo from './OtherInfo.jsx';
import ImageGallery from './ImageGallery.jsx';
import ZoomAndPanImg from './ZoomAndPanImg.jsx';
import withTracker from '../../components/Sharables/withTracker.js';

var Overview = ({ productId, productInfo, yourOutfit, handleAddToYourOutfit, handleRemoveFromYourOutfit }) => {
  // Shared managed state
  const [productStyle, setProductStyle] = useState({results: []});
  const [reviewsMeta, setReviewsMeta] = useState({});
  const [currentStyle, setCurrentStyle] = useState({photos: [{url: null}]});

  // Run on every productId change
  useEffect(() => {
    var styleRequest = axios.get(`products/${productId}/styles`);
    var reviewsMeta = axios.get('reviews/meta', {params: { 'product_id': productId }});

    axios.all([styleRequest, reviewsMeta])
      .then(axios.spread((...responses) => {
        console.dir(responses[0].data);
        console.dir(responses[1].data);
        setProductStyle(responses[0].data);
        setReviewsMeta(responses[1].data);
        setCurrentStyle(responses[0].data.results[0]);
        setMainImgIndex(0);
        setThumbnailStartIndex(0);
        setSize('Select Size');
        setQuant(0);
      }))
      .catch( err => { console.log(err); });

  }, [productId]);

  /*------ STYLE -------*/
  const handleStyleChange = (style) => {
    setCurrentStyle(style);
    setSize('Select Size');

    // if switched to a style has less thumbnails than the current main image index
    if (style.photos.length - 1 < mainImgIndex) {
      // reset the main img and thumbnail to the last item available
      let reSetIndex = style.photos.length - 1;
      setMainImgIndex(reSetIndex);
      setThumbnailStartIndex(reSetIndex);
    }
  };

  /*------ IMAGE GALLERY -------*/
  const [isDefaultView, setIsDefaultView] = useState(true);
  const [isInZoomMode, setIsInZoomMode] = useState(false);
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(mainImgIndex);

  // client requests to show up to 7 thumbnails, using 4 to test up/down arrow function
  const maxThumbnails = 4;

  // handle left/right button click on main image
  const handleImgBtnClick = (event) => {
    let newMainImgIndex;

    if (event.currentTarget.className === 'ov-left-btn') {
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

  const handleChangeView = () => {
    setIsDefaultView(!isDefaultView);
  };

  const handleChangeToZoomMode = (event) => {
    event.preventDefault();
    setIsInZoomMode(!isInZoomMode);
  };

  /*------ CART -------*/
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
    event.preventDefault();
    axios.post('/cart', data)
      .then(response => {
        alert('added to cart');
        setSize('Select Size');
        setQuant(0);
      })
      .catch( err => console.log(err) );
  };

  return (
    <div className="overview-grid ov-padding">
      <div className={`ov-top-row-${isDefaultView ? 'default' : 'expended'}`}>

        <div className="ov-left-2">
          <div className="ov-img-view-container">
            {isInZoomMode ?
              <ZoomAndPanImg
                currentStyle={currentStyle}
                mainImgIndex={mainImgIndex}
                handleChangeToZoomMode={handleChangeToZoomMode}
              />
              :
              <ImageGallery
                isInZoomMode={isInZoomMode}
                currentStyle={currentStyle}
                mainImgIndex={mainImgIndex}
                maxThumbnails={maxThumbnails}
                thumbnailStartIndex={thumbnailStartIndex}
                isDefaultView={isDefaultView}
                handleImgBtnClick={handleImgBtnClick}
                handleImgThumbnailClick={handleImgThumbnailClick}
                handleThumbnailScrollUp={handleThumbnailScrollUp}
                handleThumbnailScrollDown={handleThumbnailScrollDown}
                handleChangeView={handleChangeView}
                handleChangeToZoomMode={handleChangeToZoomMode}
              />
            }
          </div>
        </div>

        {// Only in default view, show product info, style selector and cart
          isDefaultView &&
          <div className="ov-right-1">
            <div className="ov-product-info-container">
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
                handleRemoveFromYourOutfit={handleRemoveFromYourOutfit}
              />
            </div>
          </div>}

      </div>

      <div className="ov-bottom-row">
        <OtherInfo productInfo={productInfo}/>
      </div>
    </div>
  );
};

const OverviewWithTracker = withTracker(Overview, 'overview');

export default OverviewWithTracker;