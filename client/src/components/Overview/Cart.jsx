import React, { useState } from 'react';
import helper from '../../../../lib/clientHelpers.js';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

var Cart = (props) => {
  var skus = props.currentStyle.skus;
  var isYourOutfit = props.isYourOutfit;
  var handleYourOutfitStarClick = props.handleYourOutfitStarClick;

  const [selectedSize, setSize] = useState('Select Size');
  // const [noSizes, setNoSizes] = useState(false);
  const [selectedQuant, setQuant] = useState(0);

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
      sizes.unshift(<option defaultValue={selectedSize} key='select-size'>Select Size</option>);
      return sizes;
    }
  };

  var quantitySelector = (selectedSize) => {
    console.log(selectedSize);
    if (selectedSize === 'Select Size') {
      return <option>-</option>;
    } else {
      var maxQuant = skus[selectedSize].quantity < 15 ? skus[selectedSize].quantity : 15;

      // generate option from 1 to maxQuant
      var quantities = Array(maxQuant).fill(0).map((val, i) => (
        <option value={i + 1} key={(i + 1).toString()}>{i + 1}</option>
      ));

      return quantities;
    }
  };

  var handleAddToCart = (event) => {
    event.preventDefault();

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
          disabled={ selectedSize === 'Select Size' }
          onChange={ (e) => { setQuant(e.target.value); } }
          className="ov-boarder">
          {quantitySelector(selectedSize)}
        </select>

        <br></br>
        <input type="submit" value="ADD TO CART                    +" className="ov-boarder"></input>
      </form>
      <div className="my-outfit-star">{
        isYourOutfit ?
          <AiFillStar onClick={handleYourOutfitStarClick}/>
          :
          <AiOutlineStar onClick={handleYourOutfitStarClick}/>
      }</div>
    </div>
  );
};

export default Cart;