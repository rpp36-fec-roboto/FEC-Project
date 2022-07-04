import React, { useState } from 'react';
import helper from '../../../../lib/clientHelpers.js';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

var Cart = (props) => {
  var skus = props.currentStyle.skus;

  var [selectedSize, setSize] = useState('');
  var [noSizes, setNoSizes] = useState(false);
  var [selectedQuant, setQuant] = useState(1);

  // this should be determined by getting information from locally saved myOutfit
  // may need a helper function VS server request to determine initial state
  var [isMyOutfit, setIsMyOutfit] = useState(false);

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
      var maxQuant = skus[selectedSize].quantity < 15 ? skus[selectedSize].quantity : 15;

      // generate option from 1 to maxQuant
      var quantities = [...Array(maxQuant).keys()].map(i => {
        return <option value={i + 1}>{i + 1}</option>;
      });

      // add default value to quantity selector
      quantities.unshift(<option defaultValue={selectedQuant}>{selectedQuant}</option>);
      return quantities;
    }
  };

  var handleAddMyOutfit = (e) => {
    if (isMyOutfit) {
      // remove from myOutfit
    } else {
      // add to myOutfit
    }

    setIsMyOutfit(!isMyOutfit);
  };

  var handleAddToCart = (e) => {
    e.preventDefault();

    var body = {
      size: selectedSize,
      quantity: selectedQuant
    };

    // post request to server
  };

  return (
    <div>
      <form onSubmit={handleAddToCart}>
        <select
          disabled={ !helper.inStock(skus) }
          onChange={ (e) => { setSize(e.target.value); } }
          className="ov-boarder">
          {sizeSelector(skus)}
        </select>

        <select
          disabled={ !selectedSize }
          onChange={ (e) => { setQuant(e.target.value); } }
          className="ov-boarder">
          {quantitySelector(selectedSize)}
        </select>

        <input type="submit" value="ADD TO CART                    +" className="ov-boarder"></input>
      </form>
      <div className="my-outfit-star">{
        isMyOutfit ?
          <AiFillStar onClick={handleAddMyOutfit}/>
          :
          <AiOutlineStar onClick={handleAddMyOutfit}/>
      }</div>
    </div>
  );
};

export default Cart;