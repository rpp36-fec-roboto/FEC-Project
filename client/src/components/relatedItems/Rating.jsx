import React from 'react';
import {calculateRating} from '../../../../lib/clientHelpers.js';

var Rating = function ( {ratings} ) {
  if (ratings !== null && Object.keys(ratings).length > 0) {
    let rating = calculateRating(ratings);

    return (
      <div>
        <span>Star rating: {rating}/5 </span>
      </div>
    );
  }
  return (
    <div></div>
  );
};

export default Rating;