import React, { useState } from 'react';
import usePanAndZoom from './customHook/hooks.js';

import noImg from '../../assets/no-image.jpeg';
import plusSymbol from '../../assets/plus_icon.png';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { AiOutlineExpand } from 'react-icons/ai';
import { IconContext } from 'react-icons';

var ImageGallery = ({
  isInZoomMode,
  currentStyle,
  mainImgIndex,
  thumbnailStartIndex,
  maxThumbnails,
  isDefaultView,
  handleImgBtnClick,
  handleImgThumbnailClick,
  handleThumbnailScrollUp,
  handleThumbnailScrollDown,
  handleChangeView,
  handleChangeToZoomMode
}) => {

  if (isInZoomMode) {
    return null;
  }

  const cursorOnHover = (isdefaultView) => {
    if (isdefaultView) {
      return {cursor: 'zoom-in'};
    } else {
      return {cursor: `url(${plusSymbol}), crosshair`};
    }
  };

  // generate thumbnail img list
  var imgThumbnails = (currentStyle, thumbnailStartIndex) => {
    var thumbnails = currentStyle.photos.map((photo, index) => {
      if (index >= thumbnailStartIndex && index < thumbnailStartIndex + maxThumbnails) {
        return (
          <li
            key={index.toString()}
            className={'ov-thumbnail-container ' + (index === mainImgIndex ? 'ov-thumbnail-selected' : '')}
          >
            <img
              className={`ov-img-thumbnail${isDefaultView ? '' : '-expanded'}`}
              src={photo.thumbnail_url || noImg}
              alt={`image #${index + 1} of ${currentStyle.name}`}
              onClick={ (e) => { handleImgThumbnailClick(index); } }
            />
          </li>);
      }
    });
    return thumbnails;
  };

  return (
    <>
      <div className={'ov-thumbnails-list-container' + (isDefaultView ? '' : '-expanded')}>
        {thumbnailStartIndex !== 0 &&
          <div
            className="ov-scroll-btn"
            onClick={handleThumbnailScrollUp}
            data-testid="scroll-up"
          >
            <MdOutlineKeyboardArrowUp/>
          </div>}

        <div className="ov-thumbnails-list">
          <ul data-testid="thumbnails">
            {imgThumbnails(currentStyle, thumbnailStartIndex)}
          </ul>
        </div>

        {maxThumbnails < (currentStyle.photos.length - thumbnailStartIndex) &&
          <div
            className="ov-scroll-btn"
            onClick={handleThumbnailScrollDown}
            data-testid="scroll-down"
          >
            <MdOutlineKeyboardArrowDown/>
          </div>}
      </div>

      <div className={'ov-main-img-container' + (isDefaultView ? '' : '-expanded')}>
        <img
          className="ov-main-img"
          style={cursorOnHover(isDefaultView)}
          onClick={isDefaultView ? handleChangeView : handleChangeToZoomMode}
          src={currentStyle.photos[mainImgIndex].url || noImg}
          alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
        />
      </div>

      { // conditionally rendering of left arrow button
        mainImgIndex !== 0 &&
        <div
          data-testid="left-click"
          className="ov-left-btn"
          name="left-click"
          onClick={handleImgBtnClick}>
          <IconContext.Provider value={{className: 'center-icon'}}>
            <MdOutlineArrowBackIosNew />
          </IconContext.Provider>
        </div>
      }
      { // conditionally rendering of right arrow button
        mainImgIndex !== currentStyle.photos.length - 1 &&
        <div
          data-testid="right-click"
          className="ov-right-btn"
          name="right-click"
          onClick={handleImgBtnClick}>
          <IconContext.Provider value={{className: 'center-icon'}}>
            <MdOutlineArrowForwardIos />
          </IconContext.Provider>
        </div>
      }
      <div className="ov-expand-icon-container" onClick={handleChangeView}>
        <AiOutlineExpand />
      </div>
    </>
  );

};

export default ImageGallery;