import React from 'react';
import {IoIosStarOutline, IoIosCloseCircleOutline} from 'react-icons/io';


var ActionBtn = function (props) {
  const {
    listType,
    productId,
    onClickAction
  } = props;

  const design = listType === 'relatedProduct'
    ? IoIosStarOutline
    : IoIosCloseCircleOutline;

  return (
    <div>
      <button
        className="rp-card-action-btn"
        type="button"
        onClick={() => onClickAction(productId)}
      >
        {design()}
      </button>
    </div>
  );
};

export default ActionBtn;