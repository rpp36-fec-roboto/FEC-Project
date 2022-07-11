import React, { useState } from 'react';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

var ImageGallery = (props) => {
  // data props
  const currentStyle = props.currentStyle;
  const mainImgIndex = props.mainImgIndex;
  const thumbnailStartIndex = props.thumbnailStartIndex;
  const maxThumbnails = props.maxThumbnails;

  // event handlers props
  const handleImgBtnClick = props.handleImgBtnClick;
  const handleImgThumbnailClick = props.handleImgThumbnailClick;
  const handleThumbnailScrollUp = props.handleThumbnailScrollUp;
  const handleThumbnailScrollDown = props.handleThumbnailScrollDown;
  const handleImgClick = props.handleImgClick;

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
              src={photo.thumbnail_url}
              alt={`image #${index + 1} of ${currentStyle.name}`}
              onClick={ (e) => { handleImgThumbnailClick(index); } }
            />
          </li>);
      }
    });
    return thumbnails;
  };

  return (
    <div>
      <div className="ov-img-view-container">

        <div className="ov-main-img-container">
          <img
            className="ov-main-img"
            onClick={handleImgClick}
            src={currentStyle.photos[mainImgIndex].url}
            alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
          />
        </div>

        <div className="ov-thumbnails-list-container">
          <div
            className="ov-scroll-btn"
            onClick={handleThumbnailScrollUp}
          >{ thumbnailStartIndex !== 0 && <MdOutlineKeyboardArrowUp /> }
          </div>

          <div className="ov-thumbnails-list">
            <ul>
              {imgThumbnails(currentStyle, thumbnailStartIndex)}
            </ul>
          </div>

          <div
            className="ov-scroll-btn"
            onClick={handleThumbnailScrollDown}
          >{maxThumbnails < (currentStyle.photos.length - thumbnailStartIndex) &&
            <MdOutlineKeyboardArrowDown />}
          </div>
        </div>

        { // conditionally rendering of left arrow button
          mainImgIndex !== 0 &&
          <button
            name="left-click"
            className="ov-btn ov-left-btn"
            onClick={handleImgBtnClick}
          >Left arrow</button>
        }
        { // conditionally rendering of left arrow button
          mainImgIndex !== currentStyle.photos.length - 1 &&
          <button
            name="right-click"
            className="ov-btn ov-right-btn"
            onClick={handleImgBtnClick}
          >Right arrow</button>
        }
      </div>
    </div>
  );

};

export default ImageGallery;