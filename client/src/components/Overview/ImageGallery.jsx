import React, { useState } from 'react';
import noImg from '../../assets/no-image.jpeg';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { IconContext } from 'react-icons';

var ImageGallery = ({ currentStyle, mainImgIndex, thumbnailStartIndex, maxThumbnails,
  handleImgBtnClick, handleImgThumbnailClick, handleThumbnailScrollUp, handleThumbnailScrollDown, handleImgClick}) => {

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

        <div className="ov-main-img-container">
          <img
            className="ov-main-img"
            onClick={handleImgClick}
            src={currentStyle.photos[mainImgIndex].url || noImg}
            alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
          />
        </div>

        <div className="ov-thumbnails-list-container">
          {thumbnailStartIndex !== 0 &&
            <div
              className="ov-scroll-btn"
              onClick={handleThumbnailScrollUp}

            >
              <MdOutlineKeyboardArrowUp data-testid="scroll-up"/>
            </div>}

          <div className="ov-thumbnails-list">
            <ul>
              {imgThumbnails(currentStyle, thumbnailStartIndex)}
            </ul>
          </div>

          {maxThumbnails < (currentStyle.photos.length - thumbnailStartIndex) &&
            <div
              className="ov-scroll-btn"
              onClick={handleThumbnailScrollDown}

            >
              <MdOutlineKeyboardArrowDown data-testid="scroll-down"/>
            </div>}
            {/* <div
              className="ov-scroll-btn"
              onClick={handleThumbnailScrollDown}
              data-testid="scroll-down"
            > {maxThumbnails < (currentStyle.photos.length - thumbnailStartIndex) &&  <MdOutlineKeyboardArrowDown />}

            </div> */}
        </div>

        { // conditionally rendering of left arrow button
          mainImgIndex !== 0 &&
          <div className="ov-left-btn" name="left-click" onClick={handleImgBtnClick}>
            <IconContext.Provider value={{className: 'center-icon'}}>
              <MdOutlineArrowBackIosNew />
            </IconContext.Provider>
          </div>
        }
        { // conditionally rendering of left arrow button
          mainImgIndex !== currentStyle.photos.length - 1 &&
          <div className="ov-right-btn" name="right-click" onClick={handleImgBtnClick}>
            <IconContext.Provider value={{className: 'center-icon'}}>
              <MdOutlineArrowForwardIos />
            </IconContext.Provider>
          </div>
        }
      </div>
    </>
  );

};

export default ImageGallery;