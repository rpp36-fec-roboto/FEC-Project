import React, { useState, useEffect, useRef } from 'react';
import helper from '../../../../lib/clientHelpers.js';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

var Cart = (props) => {
  const skus = props.currentStyle.skus;
  const isYourOutfit = props.isYourOutfit;
  const selectedSize = props.selectedSize;
  const selectedQuant = props.selectedQuant;

  const handleSelect = props.handleSelect;
  const submitCartRequest = props.submitCartRequest;
  const handleYourOutfitStarClick = props.handleYourOutfitStarClick;

  var [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(false);
  }, [selectedSize]);

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

  const sizeInput = useRef(null);

  var handleAddToCart = (event) => {
    // console.log('clicked');
    event.preventDefault();
    var size = selectedSize;
    var quantity = selectedQuant;
    if (size !== 'Select Size') {
      setShowMessage(false);
      submitCartRequest({ size, quantity });
    }

    // if no size selected
    if (size === 'Select Size') {
      console.log(sizeInput.current);
      setShowMessage(true);
      sizeInput.current.focus();
    }
  };

  return (
    <div>
      <form onSubmit={handleAddToCart}>
        {/* show <p>Please select a size</p> when clicking on add to cart but  */}
        {showMessage && <div>Please select a size</div>}
        <select
          name="ov-size"
          disabled={ !helper.inStock(skus) }
          onChange={handleSelect}
          ref={sizeInput}
          className="ov-boarder">
          {sizeSelector(skus)}
        </select>

        <select
          name="ov-quantity"
          disabled={ selectedSize === 'Select Size' }
          onChange={handleSelect}
          className="ov-boarder">
          {quantitySelector(selectedSize)}
        </select>

        <br></br> {helper.inStock(skus) &&
          <input type="submit" value="ADD TO CART                    +" className="ov-boarder"></input>
          // <button onClick={handleAddToCart} className="ov-boarder">Add to cart</button>
        }
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