import React, { useState } from 'react';

var ImageGallery = (props) => {
  var currentStyle = props.currentStyle;
  var mainImgIndex = props.mainImgIndex;
  var handleImgThumbnailClick = props.handleImgThumbnailClick;

  // const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(mainImgIndex);

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
            alt={`#${mainImgIndex + 1} image of ${currentStyle.name}`}
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

        {mainImgIndex !== 0 &&
          <button className="ov-btn ov-left-btn">Left arrow</button>
        }
        {mainImgIndex !== currentStyle.photos.length - 1 &&
          <button className="ov-btn ov-right-btn">Right arrow</button>
        }
      </div>

      <div>Expaneded view
        <div>current image overlaying entire overview besides other info</div>
      </div>
    </div>
  );

};

export default ImageGallery;