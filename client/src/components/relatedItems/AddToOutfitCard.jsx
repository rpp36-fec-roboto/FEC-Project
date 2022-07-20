import React, {useState, useEffect} from 'react';
import {FaPlus} from 'react-icons/fa';

var AddToOutfitCard = function (props) {
  const {
    productId,
    onAddCardClick
  } = props;

  return (
    <div className="rp-card-container">
      <div className="rp-card add-outfit" onClick={() => onAddCardClick(productId)}>
        {FaPlus()}
      </div>

      <>
        <b>Add to Outfit</b>
      </>
    </div>
  );
};

export default AddToOutfitCard;