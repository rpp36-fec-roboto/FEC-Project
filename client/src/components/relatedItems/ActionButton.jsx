import React from 'react';
import {IoIosStarOutline, IoIosCloseCircleOutline} from 'react-icons/io';

var addBtn = <button className="rp-card-action-btn">{IoIosStarOutline()}</button>;
var removeBtn = <button className="rp-card-action-btn">{IoIosCloseCircleOutline()}</button>;

var ActionBtn = function (props) {
  let actionBtn = props.list === 'relatedProducts'
    ? addBtn
    : removeBtn;

  return (
    <div>
      {actionBtn}
    </div>
  );
};

export default ActionBtn;