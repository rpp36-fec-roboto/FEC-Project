import React, {useState, useEffect} from 'react';
import {FaPlus} from 'react-icons/fa';

var AddToOutfitCard = function (props) {
  const {
    productId,
    onAddCardClick
  } = props;

  return (
    <div className="rp-card-container add-outfit">
      <div className="rp-card add-outfit" onClick={() => onAddCardClick(productId)}>
        <p className="add-outfit">{FaPlus()}<br></br></p>
      </div>
      <span className="add-outfit"><b>Add to Outfit</b></span>
    </div>
  );
};

export default AddToOutfitCard;