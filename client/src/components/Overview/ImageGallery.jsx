import React, { useState } from 'react';
import MainImage from './MainImage.jsx';
import noImg from '../../assets/no-image.jpeg';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { AiOutlineExpand } from 'react-icons/ai';
import { IconContext } from 'react-icons';

var ImageGallery = ({ currentStyle, mainImgIndex, thumbnailStartIndex, maxThumbnails, isDefaultView,
  handleImgBtnClick, handleImgThumbnailClick, handleThumbnailScrollUp, handleThumbnailScrollDown, handleChangeView}) => {

  // generate thumbnail img list
  var imgThumbnails = (currentStyle, thumbnailStartIndex) => {
    var thumbnails = currentStyle.photos.map((photo, index) => {
      if (index >= thumbnailStartIndex && index < thumbnailStartIndex + maxThumbnails) {
        return (
          <li
            key={index.toString()}
            className={ 'ov-thumbnail-container ' + (index === mainImgIndex ? "ov-thumbnail-selected" : "") }
          >
            <img
              className="ov-img-thumbnail"
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
      <div className="ov-img-view-container">
        <MainImage
          isDefaultView={isDefaultView}
          mainImgIndex={mainImgIndex}
          currentStyle={currentStyle}
          handleChangeView={handleChangeView}
        />

        <div className="ov-thumbnails-list-container">
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
      </div>
    </>
  );

};

export default ImageGallery;