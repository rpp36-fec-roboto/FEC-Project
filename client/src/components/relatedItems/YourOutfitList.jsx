import React, {useState, useEffect} from 'react';

import RelatedProductCard from './RelatedProductCard.jsx';
import sampleData from '../../data/sampleData.js';

var YourOutfitList = function (props) {
  const productId = props.productId;
  const productInfo = sampleData.productInfo;
  const productStyle = sampleData.productStyle;
  const [yourOutfit, setYourOutfit] = useState(props.yourOutfit);
  const [show, setShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(yourOutfit.length);

  let products = yourOutfit.map((id) => {
    return (
      <div key={id.toString()}>
        <div style={{ padding: 8 }}>
          <RelatedProductCard
            list={'yourOutfit'}
            productId={id}
          />
        </div>
      </div>
    );
  });

  // useEffect(() => {
  //   setLength(products.length);
  // }, [products]);

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  return (
    <div style={{ maxWidth: 1200, maxHeight: 100, marginLeft: 'auto', marginRight: 'auto', marginTop: 0 }}>
      <h3>YOUR OUTFIT</h3>
      <div className="ri-carousel-container">
        <div className="ri-carousel-wrapper">
          {
            currentIndex > 0 &&
            <button onClick={prev} className="ri-left-arrow">
              &lt;
            </button>
          }
          <div className="ri-carousel-content-wrapper">
            <div
              className={`ri-carousel-content show-${show}`}
              style={{ transform: `translateX-${currentIndex * (100 / show)}%)` }}
            >
              {products}
            </div>
          </div>
          {
            currentIndex < (length - 1) &&
            <button onClick={next} className="ri-right-arrow">
              &gt;
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default YourOutfitList;