import React from 'react';
import {IoIosStarOutline, IoIosCloseCircleOutline} from 'react-icons/io';


var ActionBtn = function (props) {
  const {
    listType,
    productId,
    onClickAction
  } = props;

  let aria, action, design;

  if (listType === 'relatedProduct') {
    aria = 'Add item to your outfit';
    design = IoIosStarOutline;
    action = 'add';
  } else {
    aria = 'Remove item from your outfit';
    design = IoIosCloseCircleOutline;
    action = 'remove';
  }

  return (
    <div>
      <button
        aria-label={aria}
        className="rp-card-action-btn"
        name="outfit"
        type="button"
        value={action}
        onClick={() => onClickAction(productId)}
      >
        {design()}
      </button>
    </div>
  );
};

export default ActionBtn;