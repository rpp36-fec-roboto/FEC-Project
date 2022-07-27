import React, { useState, useReducer, useRef } from 'react';
import reducer, { initialState } from './customHook/reducer.js';
import { pan, startPan, zoomIn, zoomOut } from './customHook/actions.js';

import noImg from '../../assets/no-image.jpeg';

const ZoomAndPanImg = ({ isInZoomMode, mainImgIndex, currentStyle, handleChangeToZoomMode }) => {
  if (!isInZoomMode) {
    return null;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const containerRef = useRef(null);

  const onMouseMoveInWindow = (event) => {
    event.preventDefault();
    dispatch(pan(event));
  };

  return (
    <div className="ov-main-img-container-zoom"
      ref={containerRef}
      onClick={handleChangeToZoomMode}
      onMouseOver={() => {
        dispatch(zoomIn(event));
        dispatch(startPan(event));
        window.addEventListener('mousemove', onMouseMoveInWindow);
      }}
    >
      <div
        className="ov-main-img-style-container"
        style={{
          transform: `scale(${state.scale}) translate(${state.translateX}px, ${state.translateY}px)`,
        }}
      >
        <img
          className="ov-main-img"
          src={currentStyle.photos[mainImgIndex].url || noImg}
          alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
        />

      </div>
    </div>
  );
};

export default ZoomAndPanImg;