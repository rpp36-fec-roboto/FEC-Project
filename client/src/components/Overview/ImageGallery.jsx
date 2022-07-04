import React, { useState } from 'react';

var ImageGallery = (props) => {
  var currentStyle = props.currentStyle;
  var mainImgIndex = props.mainImgIndex;
  var handleImgThumbnailClick = props.handleImgThumbnailClick;

  return (
    <div>
      <div className="ov-default-view">
        <img
          className="ov-main-img"
          src={currentStyle.photos[mainImgIndex].url}
          alt={`#${mainImgIndex + 1} image of ${currentStyle.name}`}
        />
        <div>thumbnail images of overlaying the default view image. Selection match current view.
          up to 7 thumbnail images in a column
        <button>arrows to scroll for more thumbnail images</button>
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