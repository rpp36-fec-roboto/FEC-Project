import React, { useState, useEffect, useRef } from 'react';
import helper from '../../../../lib/clientHelpers.js';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

var Cart = ({ currentStyle, isYourOutfit, selectedSize, selectedQuant,
  handleSelect, submitCartRequest, handleAddToYourOutfit, handleRemoveYourOutfit }) => {

  const skus = currentStyle.skus;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(false);
  }, [selectedSize]);

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
    // console.log('clicked');
    event.preventDefault();
    var size = selectedSize;
    var quantity = selectedQuant;
    if (size !== 'Select Size') {
      setShowMessage(false);
      submitCartRequest({ sku: size });
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
        {/* show warning when no size selected at submit */}
        {showMessage && <div>Please select a size</div>}

        <select
          name="ov-size"
          disabled={ !helper.inStock(skus) }
          defaultValue={selectedSize}
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
          <AiFillStar onClick={handleRemoveYourOutfit}/>
          :
          <AiOutlineStar onClick={handleAddToYourOutfit}/>
      }</div>
    </div>
  );
};

export default Cart;