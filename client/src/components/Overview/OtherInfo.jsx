import React from 'react';

var OtherInfo = (props) => {
  var productInfo = props.productInfo;

  var featuresList = (features) => {
    return features.map((feature, index) => (
      <li key={index.toString()}>{`${feature.feature}: ${feature.value}`}</li>
    ));
  };

  return (
    <div className="ov-bottom-row">
      <div className="ov-left-2">
        <div className="ov-other-info-container">
          <h4>{productInfo.slogan}</h4>
          <p>{productInfo.description}</p>
        </div>
      </div>
      <div className="ov-right-1">
        <ul className="ov-product-feature">
          {featuresList(productInfo.features)}
        </ul>
      </div>
    </div>
  );
};

export default OtherInfo;