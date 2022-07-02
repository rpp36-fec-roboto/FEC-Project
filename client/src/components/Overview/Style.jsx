import React from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

var Style = (props) => {

  var currentStyle = props.currentStyle;
  var productStyle = props.productStyle;
  var handleStyleChange = props.handleStyleChange;

  var price = (currentStyle) => {
    var originalPrice = currentStyle['original_price'];
    var salePrice = currentStyle['sale_price'];

    if (!salePrice) {
      return <p><span>${originalPrice}</span></p>;
    } else {
      return (
        <p>
          <span>${salePrice}</span>
          <span style={{ 'text-decoration': 'line-through' }}>${originalPrice}</span>
        </p>
      );
    }
  };

  var thumnails = (productStyle, currentStyle) => {
    return productStyle.results.map((style, index) => {
      var imageURL = style.photos[0].thumbnail_url;
      var styleName = style.name;

      return (
        <div className='style-container' key={index}>
          {style.style_id === currentStyle.style_id &&
          <IoIosCheckmarkCircleOutline
            style={{
              position: 'absolute',
              background: 'white',
              'border-radius': '50%',
              left: '80%',
              height: '1.2em',
              width: 'auto'
            }}/>}
          <img className='style-thumbnail' src={imageURL} alt={styleName}
            onClick={e => { handleStyleChange(style); }}/>
        </div>
      );
    });
  };

  // rendering Style component
  return (
    <div>
      <div className="ov-price ov-padding-verticle">{price(currentStyle)}</div>
      <div className="style-grid">
        {thumnails(productStyle, currentStyle)}
      </div>
    </div>
  );
};

export default Style;