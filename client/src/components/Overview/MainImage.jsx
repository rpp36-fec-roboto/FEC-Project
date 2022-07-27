import React, { useState } from 'react';
import usePanAndZoom from './customHook/usePanAndZoom.js';
import noImg from '../../assets/no-image.jpeg';

const MainImage = ({ isDefaultView, mainImgIndex, currentStyle, handleChangeView }) => {
  const {
    containerRef,
    zoom,
    // onZoomIn,
    // onZoomOut,
    translateX,
    translateY,
    scale
  } = usePanAndZoom();

  // const [scale, setScale] = useState(1);

  const handleImgMagnify = (event) => {
    event.preventDefault();
    setScale(2.5);
  };

  return (
    <div className="ov-main-img-container">
      <img
        className="ov-main-img"
        src={currentStyle.photos[mainImgIndex].url || noImg}
        alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
      />
    </div>
  );
};

export default MainImage;