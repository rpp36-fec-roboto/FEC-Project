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
    // containerRef.current.addEventListener('mouseover', onMouseOver);
    imgRef.current.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMoveInWindow);
    };
  }, []);

  // useEffect(() => {
  //   return () => {
  //     imgRef.current.removeEventListener('mouseover', onMouseOver);
  //   };
  // }, translateX);

  return (
    <div className="ov-main-img-container" ref={containerRef}>
      <img
        className="ov-main-img"
        ref={imgRef}
        onClick={handleChangeToZoomMode}
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        }}
        src={currentStyle.photos[mainImgIndex].url || noImg}
        alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
      />

    </div>
  );
};

export default ZoomAndPanImg;