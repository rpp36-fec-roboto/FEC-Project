import React from 'react';
import {calculateRating} from '../../../../lib/clientHelpers.js';
import StarRating from '../Sharables/StarRating.jsx';

var Rating = function ( {ratings} ) {

  if (ratings !== null && Object.keys(ratings).length > 0) {
    let rating = calculateRating(ratings);
    let stars = Number(rating.slice(0, rating.length - 1)) / 100 * 5;

    return (
      <div className="rating">
        <StarRating rating={rating} />
        <span>Star rating: {stars}/5 </span>
      </div>
    );
  }
  return (
    <div></div>
  );
};

export default Rating;