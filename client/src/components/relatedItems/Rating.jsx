import React from 'react';
import {calculateRating} from '../../../../lib/clientHelpers.js';

var Rating = function (props) {
  let ratings = props.ratings;
  let rating = calculateRating(ratings);

  return (
    <div>
      <span>Star rating: {rating}/5 </span>
    </div>
  );
};

export default Rating;