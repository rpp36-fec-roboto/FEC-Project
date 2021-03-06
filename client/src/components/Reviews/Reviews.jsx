import React, { useState, useEffect } from 'react';
import sampleData from '../../mockFiles/sampleData.js';
import StarRating from '../Sharables/StarRating.jsx';

// import axios from 'axios';

const Reviews = (props) =>(
  <div id="reviews">
    <div className="qa-paddingbottom">RATINGS & REVIEWS</div>
    <div>{sampleData.reviews.results.map(review => (
      <div key={review['review_id']}>
        <StarRating rating={(review.rating / 5) * 100 + '%'}/>
        <p>Summary: {review.summary}</p>
        <p>{review.body}</p>
        <p>{review.date} <span>{review['reviewer_name']}</span></p>
      </div>
    ))}</div>
  </div>
);

export default Reviews;