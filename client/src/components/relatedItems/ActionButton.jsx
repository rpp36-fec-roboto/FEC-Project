import React from 'react';
import {IoIosStarOutline, IoIosCloseCircleOutline} from 'react-icons/io';


var ActionBtn = function (props) {
  const addBtn =
    <button
      className="rp-card-action-btn"
      type="button"
      onClick={() => props.onStarClick(props.productId)}
    >
      {IoIosStarOutline()}
    </button>;
  const removeBtn =
    <button
      className="rp-card-action-btn"
      type="button"
      onClick={() => props.onXClick(props.productId)}
    >
      {IoIosCloseCircleOutline()}
    </button>;
  const actionBtn = props.listType === 'relatedProducts'
    ? addBtn
    : removeBtn;

  return (
    <div>
      {actionBtn}
    </div>
  );
};

export default ActionBtn;