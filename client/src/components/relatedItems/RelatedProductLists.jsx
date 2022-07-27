import React, {useState, useEffect} from 'react';

import AddToOutfitCard from './AddToOutfitCard.jsx';
import RelatedProductCard from './RelatedProductCard.jsx';

var RelatedProductLists = function (props) {
  const {
    listType,
    productId,
    productInfo,
    productReviews,
    productStyles,
    relatedProduct,
    yourOutfit,
    onCardClick,
    onStarClick,
    onXClick
  } = props;

  const show = 4;
  let list, listHeading, listLength;

  if (listType === 'relatedProduct') {
    list = Array.from(new Set(relatedProduct));
    listHeading = 'RELATED PRODUCTS';
    listLength = relatedProduct.length;
  } else {
    list = Array.from(new Set(yourOutfit));
    list.unshift('addToOutfit');
    listHeading = 'YOUR OUTFIT';
    listLength = list.length;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(listLength);

  let products = list.map((id) => {
    let prodInfo = productInfo.filter((prod) => prod.id === id);
    let prodRatings = productReviews.filter((prod) => Number(prod.product_id) === id);
    let prodStyles = productStyles.filter((prod) => Number(prod.product_id) === id);

    if (id === 'addToOutfit') {
      return (
        <div key={id} role='list'>
          <div style={{ padding: 4 }} role='listitem'>
            <AddToOutfitCard productId={productId} onAddCardClick={onStarClick} />
          </div>
        </div>
      );
    } else {
      return (
        <div key={id.toString()} role='list'>
          <div style={{ padding: 4 }} role='listitem'>
            <RelatedProductCard
              listType={listType}
              productId={id}
              productInfo={prodInfo[0]}
              productRatings={prodRatings[0]}
              productStyles={prodStyles[0]}
              onCardClick={onCardClick}
              onStarClick={onStarClick}
              onXClick={onXClick}
            />
          </div>
        </div>
      );
    }
  });

  useEffect(() => {
    setLength(products.length);
  }, [products]);

  const next = () => {
    if (currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  return (
    <>
      <div className="ri-carousel-container">
        <h3>{listHeading}</h3>
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
              style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
            >
              {products}
            </div>
          </div>
          {
            currentIndex < (length - show) &&
            <button onClick={next} className="ri-right-arrow">
              &gt;
            </button>
          }
        </div>
      </div>
    </>
  );
};

export default RelatedProductLists;