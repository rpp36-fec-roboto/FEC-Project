import React from 'react';

var OtherInfo = ({ productInfo }) => {

  var featuresList = (features) => {
    return features.map((feature, index) => (
      <li key={index.toString()}>{feature.value}</li>
    ));
  };

  return (
    <>
      <div className="ov-left-2">
        <div className="ov-other-info-container">
          <h4>{productInfo.slogan}</h4>
          <p className="ov-grey-text">{productInfo.description}</p>
        </div>
      </div>
      <div className="ov-right-1">
        <ul className="ov-product-feature ov-grey-text">
          {featuresList(productInfo.features)}
        </ul>
      </div>
    </>
  );
};

export default OtherInfo;