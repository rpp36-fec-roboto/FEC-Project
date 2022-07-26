import React from 'react';
import { FiCheck } from 'react-icons/fi';

var OtherInfo = ({ productInfo }) => {

  var featuresList = (features) => {
    if (features) {
      return features.map((feature, index) => {
        if (feature.value) {
          return (<li key={index.toString()}>
            <FiCheck size={20}/><div className="ov-feature-li">&nbsp;&nbsp;&nbsp;{feature.feature}: {feature.value}</div>
          </li>);
        }
      });
    }
  };

  return (
    <>
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
    </>
  );
};

export default OtherInfo;