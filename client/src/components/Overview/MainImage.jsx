import React, { useState } from 'react';
import noImg from '../../assets/no-image.jpeg';

const MainImage = ({ isDefaultView, mainImgIndex, currentStyle, handleChangeView }) => {
  const handleImgMagnify = () => {};

  return (
    <div className="ov-main-img-container">
      <img
        className="ov-main-img"
        onClick={isDefaultView ? handleChangeView : handleImgMagnify}
        src={currentStyle.photos[mainImgIndex].url || noImg}
        alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
      />
    </div>
  );
};

export default MainImage;