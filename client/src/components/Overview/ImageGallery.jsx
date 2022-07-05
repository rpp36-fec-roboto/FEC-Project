import React, { useState } from 'react';

var ImageGallery = (props) => {
  var currentStyle = props.currentStyle;
  var mainImgIndex = props.mainImgIndex;
  var handleImgBtnClick = props.handleImgBtnClick;
  var handleImgThumbnailClick = props.handleImgThumbnailClick;

  // client's request of showing up to 7 thumbnails, using 4 to test up/down arrow function
  var maxThumbnails = 4;

  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(mainImgIndex);

  var imgThumbnails = (currentStyle, thumbnailStartIndex) => {
    // needs update for scrolling functionality
    console.log(thumbnailStartIndex);
    var thumbnails = currentStyle.photos.map((photo, index) => {
      if (index >= thumbnailStartIndex && index < thumbnailStartIndex + maxThumbnails) {
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

  // handle up/down arrow click in thumbnail img
  var handleThumbnailScroll = (director, thumbnailStartIndex) => {
    // scroll by 3
    var startIndex = thumbnailStartIndex;
    if (director === 'down') {
      startIndex += 3;
    } else {
      startIndex -= 3;
    }

    // if (startIndex >= currentStyle.photos.length - 1) {
    //   startIndex = currentStyle.photos.length - 1 - maxThumbnails;
    // }
    if (startIndex < 0) {
      startIndex = 0;
    }

    setThumbnailStartIndex(startIndex);
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
          <button
            disabled={thumbnailStartIndex === 0 ? true : false}
            className="ov-btn"
            onClick={(e) => { handleThumbnailScroll('up', thumbnailStartIndex); }}
          >up arrow</button>

          <div className="ov-thumbnails-list">
            <ul>
              {imgThumbnails(currentStyle, thumbnailStartIndex)}
            </ul>
          </div>

          <button
            disabled={maxThumbnails >= (currentStyle.photos.length - thumbnailStartIndex) ? true : false}
            className="ov-btn"
            onClick={ (e) => { handleThumbnailScroll('down', thumbnailStartIndex); }}
          >down arrow</button>
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