import React, { useState, useEffect, useRef } from 'react';
import helper from '../../../../lib/clientHelpers.js';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

var Cart = ({ currentStyle, isYourOutfit, selectedSize, selectedQuant,
  handleSelect, submitCartRequest, handleAddToYourOutfit, handleRemoveFromYourOutfit }) => {

  const skus = currentStyle.skus;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(false);
  }, [selectedSize, currentStyle]);

  const sizeSelector = (skus) => {
    if (!helper.inStock(skus)) {
      return <option>OUT OF STOCK</option>;
    } else {
      var sizes = Object.keys(skus).map(sku => {
        let skuObj = skus[sku];
        if (skuObj.quantity) {
          return <option key={sku} value={sku}>{skuObj.size}</option>;
        }
      });

      // add the default value to size options
      sizes.unshift(<option key='select-size'>Select Size</option>);
      return sizes;
    }
  };

  const quantitySelector = (selectedSize) => {
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

  // add to cart button, underconstruction for all features
  const sizeInput = useRef(null);
  const handleAddToCart = (event) => {
    event.preventDefault();
    var size = selectedSize;
    var quantity = selectedQuant;
    if (size !== 'Select Size') {
      setShowMessage(false);
      submitCartRequest({ sku: size });
    }

    // if no size selected
    if (size === 'Select Size') {
      setShowMessage(true);
      sizeInput.current.focus();
    }
  };

  return (
    <div className="ov-cart-container">
      <form>
        {/* show warning when no size selected at submit */}
        {showMessage && <p>Please select a size</p>}

        <select
          className="ov-size"
          name="ov-size"
          disabled={ !helper.inStock(skus) }
          defaultValue={selectedSize}
          onChange={handleSelect}
          ref={sizeInput}>
          {sizeSelector(skus)}
        </select>

        <select
          className="ov-quantity"
          name="ov-quantity"
          disabled={ selectedSize === 'Select Size' }
          onChange={handleSelect}>
          {quantitySelector(selectedSize)}
        </select>

        <br></br> {helper.inStock(skus) &&
          <button onClick={handleAddToCart} className="ov-add-to-cart">ADD TO CART
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          +</button>
        }
        <button
          className="my-outfit-star"
          onClick={isYourOutfit ? handleRemoveFromYourOutfit : handleAddToYourOutfit}
        >{isYourOutfit ? <AiFillStar/> : <AiOutlineStar/>}</button>
      </form>

    </div>
  );
};

export default Cart;