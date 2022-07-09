import React, {useState, useEffect} from 'react';

import RelatedProductCard from './RelatedProductCard.jsx';
import sampleData from '../../data/sampleData.js';

var RelatedProductsList = function (props) {
  const productId = props.productId;
  const productInfo = props.productInfo;
  const productStyle = props.productStyle;
  const relatedProduct = props.relatedProduct;
  const yourOutfit = props.yourOutfit;
  const show = 4;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(relatedProduct.length);

  const products = relatedProduct.map((id) => {
    return (
      <div key={id.toString()}>
        <div style={{ padding: 8 }}>
          <RelatedProductCard
            listType={'relatedProducts'}
            productId={id}
            onStarClick={props.onStarClick}
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
      <h3>RELATED PRODUCTS</h3>
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

export default RelatedProductsList;