import React, { useState, useReducer, useRef } from 'react';
// import reducer from './customHook/reducer.js';
// import { pan, startPanAndZoom } from './customHook/actions.js';
import usePanAndZoom from './customHook/hooks.js';

import noImg from '../../assets/no-image.jpeg';

const ZoomAndPanImg = ({
  isInZoomMode,
  initialX,
  initialY,
  mainImgIndex,
  currentStyle,
  handleChangeToZoomMode
}) => {

  const {
    containerRef,
    translateX,
    translateY,
    scale,
    onMouseOver,
  } = usePanAndZoom();

  if (!isInZoomMode) {
    return null;
  }

  return (
    // <div className="ov-main-img-container-zoom"
    //   ref={containerRef}
    //   onClick={handleChangeToZoomMode}
    //   onMouseOver={onMouseOver}
    // >
      <div
        className="ov-main-img-style-container"
        ref={containerRef}
        onClick={handleChangeToZoomMode}
        onMouseOver={onMouseOver}
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        }}
      >
        <img
          className="ov-main-img"
          src={currentStyle.photos[mainImgIndex].url || noImg}
          alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
        />

      </div>
    // </div>
  );
};

export default ZoomAndPanImg;