import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

var StarRating = ({ rating }) => (
  <div className="star-outer">
    <AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar /><AiOutlineStar />
    <div className="star-inner" style={ {width: rating} }>
      <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
    </div>
  </div>
);

export default StarRating;