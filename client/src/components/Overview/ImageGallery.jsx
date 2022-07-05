import React, { useState } from 'react';

var ImageGallery = (props) => {
  var currentStyle = props.currentStyle;
  var mainImgIndex = props.mainImgIndex;
  var thumbnailStartIndex = props.thumbnailStartIndex;
  var maxThumbnails = props.maxThumbnails;

  var handleImgBtnClick = props.handleImgBtnClick;
  var handleImgThumbnailClick = props.handleImgThumbnailClick;
  var handleThumbnailScroll = props.handleThumbnailScroll;
  var handleImgClick = props.handleImgClick;

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
          <button
            name="up-click"
            disabled={thumbnailStartIndex === 0 ? true : false}
            className="ov-btn"
            onClick={handleThumbnailScroll}
          >up arrow</button>

          <div className="ov-thumbnails-list">
            <ul>
              {imgThumbnails(currentStyle, thumbnailStartIndex)}
            </ul>
          </div>

          <button
            name="down-click"
            disabled={maxThumbnails >= (currentStyle.photos.length - thumbnailStartIndex) ? true : false}
            className="ov-btn"
            onClick={handleThumbnailScroll}
          >down arrow</button>
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