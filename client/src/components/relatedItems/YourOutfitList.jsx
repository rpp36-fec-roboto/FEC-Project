import React, {useState, useEffect} from 'react';

import RelatedProductCard from './RelatedProductCard.jsx';
import sampleData from '../../data/sampleData.js';

var YourOutfitList = function (props) {
  let [yourOutfit, setYourOutfit] = useState([71697]); // update

  let items = yourOutfit.map((item) => {
    return (
      <ul key={item}>
        <li style={{ 'listStyleType': 'none' }}>
          <RelatedProductCard
            list={'yourOutfit'}
            productId={item} // send 1st product only to start
          />
        </li>
      </ul>
    );
  });

  return (
    <div>
      <h3>YOUR OUTFIT</h3>
      {items}
    </div>

  );
};

export default YourOutfitList;