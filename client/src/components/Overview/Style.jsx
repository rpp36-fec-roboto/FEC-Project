import React from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

var Style = (props) => {
  var currentStyle = props.currentStyle;
  var productStyle = props.productStyle;
  var handleStyleChange = props.handleStyleChange;

  // conditionally render price based on on-sale/not-on-sale
  var price = (currentStyle) => {
    var originalPrice = currentStyle['original_price'];
    var salePrice = currentStyle['sale_price'];

    if (!salePrice) {
      return <p><span>${originalPrice}</span></p>;
    } else {
      return (
        <p>
          <span style={{ color: 'red' }}>${salePrice}</span>
          <span>&nbsp;&nbsp;</span>
          <span style={{ textDecoration: 'line-through' }}>${originalPrice}</span>
        </p>
      );
    }
  };

  // render list of thumnails
  var thumbnailList = (productStyle, currentStyle) => {
    return productStyle.results.map((style, index) => {
      var imageURL = style.photos[0].thumbnail_url;
      var styleName = style.name;

      return (
        <div className='style-container' key={index.toString()}>
          {style.style_id === currentStyle.style_id &&
          <IoIosCheckmarkCircleOutline
            style={{
              position: 'absolute',
              background: 'white',
              borderRadius: '50%',
              left: '80%',
              height: '1.2em',
              width: 'auto'
            }}/>}
          <img
            className='style-thumbnail'
            src={imageURL} alt={styleName}
            onClick={ e => { handleStyleChange(style); }}/>
        </div>
      );
    });
  };

  // rendering Style component
  return (
    <div>
      <div className="ov-price">{price(currentStyle)}</div>
      <div>
        <p>
          <span className="ov-all-cap ov-bold">style </span>
          <span className=".ov-bold">{'> '}</span>
          <span>{currentStyle.name}</span>
        </p>
      </div>
      <div className="style-grid ov-padding-verticle">
        {thumbnailList(productStyle, currentStyle)}
      </div>
    </div>
  );
};

export default Style;