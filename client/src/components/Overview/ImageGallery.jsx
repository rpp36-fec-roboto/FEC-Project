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
          <div className={ 'ov-thumbnail-container ' + (index === mainImgIndex ? "ov-bottom-border" : "") }>
            <img
              className="ov-img-thumbnail"
              src={photo.thumbnail_url}
              alt={`#${index + 1} image of ${currentStyle.name}`}
              onClick={ (e) => { handleImgThumbnailClick(index); } }
            />
          </div>);
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

        <div className="ov-thumbnails-grid">
          {mainImgIndex !== 0 && (<button>upward arrow</button>)}
          {imgThumbnails(currentStyle)}
          {mainImgIndex !== currentStyle.photos.length - 1 && (<button>downward arrow</button>)}
        </div>

        <button>Right arrow</button>
        <button>Left arrow</button>
      </div>

      <div>Expaneded view
        <div>current image overlaying entire overview besides other info</div>
      </div>
    </div>
  );

};

export default ImageGallery;