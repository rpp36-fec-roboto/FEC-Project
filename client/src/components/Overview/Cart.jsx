import React, { useState } from 'react';

var Cart = (props) => {
  var skus = props.currentStyle.skus;

  var [selectedSize, setSize] = useState('');
  var [noSizes, setNoSizes] = useState(false);
  var [selectedQuant, setQuant] = useState(1);

  var sizeSelector = (skus) => {
    var sizes = Object.keys(skus).map(sku => {
      var skuObj = skus[sku];

      // if quantity is not 0
      if (skuObj.quantity) {
        return <option key={sku} value={skuObj.size}>{skuObj.size}</option>;
      } else {
        return null;
      }
    });

    // if no sizes is available
    if (!sizes) {
      setNoSizes(true);
      return <option>OUT OF STOCK</option>;
    }

    // add the default value to size options
    sizes.unshift(<option defaultValue='' key=''>Select Size</option>);
    return sizes;
  };

  var quantitySelector = (selectedSize) => {
    if (!selectedSize) {
      // show '-' and disable dropdown
      return <options>-</options>;
    } else {
      // show quantity selections
      // map through sku
    }
  };

  return (
    <div>
      <form onSubmit={() => {}}>
        <select disabled={noSizes} onChange={() => {}}>
          {sizeSelector(skus)}
        </select>

        <select disabled={!selectedSize} onChange={() => {}}>
          {quantitySelector(selectedSize)}
        </select>
      </form>
      <div>size selector</div>
      <div>quantity selector</div>
      <button>Add to cart</button>
      <button>Star to add to MyOutfit</button>
    </div>
  );
};

export default Cart;