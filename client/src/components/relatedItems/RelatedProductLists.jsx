import React, {useState, useEffect} from 'react';

import RelatedProductCard from './RelatedProductCard.jsx';

var RelatedProductLists = function (props) {
  const {
    listType,
    productId,
    productInfo,
    productStyle,
    relatedProduct,
    relatedProductInfo,
    relatedProductReviews,
    relatedProductStyles,
    yourOutfit,
    yourOutfitInfo,
    yourOutfitReviews,
    yourOutfitStyles,
    onCardClick,
    onStarClick,
    onXClick
  } = props;

  const show = 4;
  const listHeading = listType === 'relatedProduct'
    ? 'RELATED PRODUCTS'
    : 'YOUR OUTFIT';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = listType === 'relatedProduct'
    ? Array.isArray(relatedProduct)
      ? useState(relatedProduct.length)
      : useState(0)
    : Array.isArray(yourOutfit)
      ? useState(yourOutfit.length)
      : useState(0);

  let relatedProductRev = [];
  if (Array.isArray(relatedProduct)) {
    let relatedProducts = new Set(relatedProduct);
    relatedProductRev = Array.from(relatedProducts);
  }

  const products = listType === 'relatedProduct'
    ? relatedProductRev.map((id) => {
      let prodInfo = relatedProductInfo.filter((prod) => prod.id === id);
      let prodRatings = relatedProductReviews.filter((prod) => Number(prod.product_id) === id);
      let prodStyle = relatedProductStyles.filter((prod) => Number(prod.product_id) === id);

      return (
        <div key={id.toString()} role='list'>
          <div style={{ padding: 8 }} role='listitem'>
            <RelatedProductCard
              listType={listType}
              productId={id}
              productInfo={prodInfo[0]}
              productRatings={prodRatings[0]}
              productStyle={prodStyle[0]}
              onCardClick={onCardClick}
              onStarClick={onStarClick}
            />
          </div>
        </div>
      );
    })
    : yourOutfit.map((id) => {
      let prodInfo = yourOutfitInfo.filter((prod) => prod.id === id);
      let prodRatings = yourOutfitReviews.filter((prod) => Number(prod.product_id) === id);
      let prodStyle = yourOutfitStyles.filter((prod) => Number(prod.product_id) === id);
      return (
        <div key={id.toString()} role='list'>
          <div style={{ padding: 8 }} role='listitem'>
            <RelatedProductCard
              listType={listType}
              productId={id}
              productInfo={prodInfo[0]}
              productRatings={prodRatings[0]}
              productStyle={prodStyle[0]}
              onCardClick={onCardClick}
              onXClick={onXClick}
            />
          </div>
        </div>
      );
    });

  // Carousel not working, arrows should not show with only four product cards
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
    <div>
      <h3>{listHeading}</h3>
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
    </div>
  );
};

export default RelatedProductLists;