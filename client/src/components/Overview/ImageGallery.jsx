import React, { useState } from 'react';

var ImageGallery = (props) => {
  var currentStyle = props.currentStyle;
  var mainImgIndex = props.mainImgIndex;
  var handleImgBtnClick = props.handleImgBtnClick;
  var handleImgThumbnailClick = props.handleImgThumbnailClick;

  var imgThumbnails = (currentStyle) => {
    // needs update for scrolling functionality
    var thumbnails = currentStyle.photos.map((photo, index) => {
      if (index < 7) {
        return (
          <li className={ 'ov-thumbnail-container ' + (index === mainImgIndex ? "ov-thumbnail-selected" : "") }>
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
      <div className="ov-default-view-container">

        <div className="ov-main-img-container">
          <img
            className="ov-main-img"
            src={currentStyle.photos[mainImgIndex].url}
            alt={`image #${mainImgIndex + 1} of style ${currentStyle.name}`}
          />
        </div>

        <div className="ov-thumbnails-list-container">
          <button className="ov-btn" onClick={() => {}}>up arrow</button>

          <div className="ov-thumbnails-list">
            <ul>
              {imgThumbnails(currentStyle)}
            </ul>
          </div>

          <button className="ov-btn" onClick={() => {}}>down arrow</button>
        </div>

        {/* conditionally rendering of left and right arrow button */}
        {mainImgIndex !== 0 &&
          <button
            name="left-click"
            className="ov-btn ov-left-btn"
            onClick={handleImgBtnClick}
          >Left arrow</button>
        }
        {mainImgIndex !== currentStyle.photos.length - 1 &&
          <button
            name="right-click"
            className="ov-btn ov-right-btn"
            onClick={handleImgBtnClick}
          >Right arrow</button>
        }
      </div>

      <div>Expaneded view
        <div>current image overlaying entire overview besides other info</div>
      </div>
    </div>
  );

};

export default ImageGallery;