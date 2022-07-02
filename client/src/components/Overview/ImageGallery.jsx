import React from 'react';

var ImageGallery = (props) => {
  // images of selected style
  // default view
  // expaned view

  return (
    <div>
      <div>Default view
        <div>current selected image. Default is first image</div>
        <div>thumbnail images of overlaying the default view image. Selection match current view.
          up to 7 thumbnail images in a column
        <button>arrow to scroll for more thumbnail images</button>
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