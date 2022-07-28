import React, { useState, useEffect, useRef } from 'react';
import usePanAndZoom from './customHook/hooks.js';

import noImg from '../../assets/no-image.jpeg';

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
        transform: `translate(${translateX}px, ${translateY}px)`,
      }}
    >
      <img
        className="ov-main-img-zoomed"
        ref={imgRef}
        onClick={handleChangeToZoomMode}
        style={{
          transform: `scale(${scale})`
        }}
        src={currentStyle.photos[mainImgIndex].url || noImg}
        alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
      />

    </div>
  );
};

export default ZoomAndPanImg;