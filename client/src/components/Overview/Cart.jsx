import React, { useState } from 'react';
import helper from '../../../../lib/clientHelpers.js';

var Cart = (props) => {
  var skus = props.currentStyle.skus;

  var [selectedSize, setSize] = useState('');
  var [noSizes, setNoSizes] = useState(false);
  var [selectedQuant, setQuant] = useState(1);

  var sizeSelector = (skus) => {
    if (!helper.inStock(skus)) {
      return <option>OUT OF STOCK</option>;
    } else {
      var sizes = Object.keys(skus).map(sku => {
        var skuObj = skus[sku];

        if (skuObj.quantity) {
          return <option key={sku} value={sku}>{skuObj.size}</option>;
        }
      });
      // add the default value to size options
      sizes.unshift(<option defaultValue='' key=''>Select Size</option>);
      return sizes;
    }
  };

  var quantitySelector = (selectedSize) => {
    if (!selectedSize) {
      return <option>-</option>;
    } else {
      console.log(skus[selectedSize]);
      var maxQuant = skus[selectedSize].quantity < 15 ? skus[selectedSize].quantity : 15;

      // generate option from 1 to maxQuant
      var quantities = [...Array(maxQuant).keys()].map(i => {
        return <option value={i + 1} key={i + 1}>{i + 1}</option>;
      });

      quantities.unshift(<option defaultValue={selectedQuant}>{selectedQuant}</option>);
      return quantities;
    }
  };

  return (
    <div>
      <form onSubmit={() => {}}>
        <select disabled={!helper.inStock(skus)} onChange={(e) => { setSize(e.target.value); }}>
          {sizeSelector(skus)}
        </select>

        <select disabled={!Boolean(selectedSize)} onChange={() => {}}>
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