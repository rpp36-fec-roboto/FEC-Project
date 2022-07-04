import React from 'react';
import {IoIosStarOutline, IoIosCloseCircleOutline} from 'react-icons/io';

var addBtn = <button>{IoIosStarOutline()}</button>;
var removeBtn = <button>{IoIosCloseCircleOutline()}</button>;

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