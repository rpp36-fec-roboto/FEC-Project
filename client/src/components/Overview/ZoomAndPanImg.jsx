import React, { useState, useEffect, useRef } from 'react';
import usePanAndZoom from './customHook/hooks.js';

import noImg from '../../assets/no-image.jpeg';
import minusSymbol from '../../assets/minus_icon.png';

const ZoomAndPanImg = ({
  initialX,
  initialY,
  mainImgIndex,
  currentStyle,
  handleChangeToZoomMode
}) => {

  const {
    containerRef,
    imgRef,
    translateX,
    translateY,
    scale,
    onMouseOver,
    onMouseMoveInWindow
  } = usePanAndZoom();

  useEffect(() => {
    imgRef.current.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMoveInWindow);
    };
  }, []);

  return (
    <div
      className="ov-main-img-container-zoomed"
      ref={containerRef}
      style={{
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
      }}
    >
      <img
        className="ov-main-img"
        style={{cursor: `url(${minusSymbol}), vertical-text`}}
        ref={imgRef}
        onClick={handleChangeToZoomMode}
        src={currentStyle.photos[mainImgIndex].url || noImg}
        alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
      />

    </div>
  );
};

export default ZoomAndPanImg;