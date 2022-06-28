import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';

var Overview = (props) => (
  <div>
    <ProductInfo />
    <Style />
    <AddToCart />
    <ImageGallery />
  </div>
);

export default Overview;