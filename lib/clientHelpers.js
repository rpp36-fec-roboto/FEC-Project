// find default style
module.exports.findDefaultStyle = (productStyle) => {
  return productStyle.results.find(style => style['default?']);
};

// takes the rating object, returns average rating
module.exports.calculateRating = (ratings) => {
  var total = 0;
  var count = 0;
  for (var rate in ratings) {
    total += rate * ratings[rate];
    count += Number(ratings[rate]);
  }

  return Number((total / count).toFixed(2));
};

module.exports.inStock = (skus) => {
  var skuArr = Object.keys(skus);

  // Object.keys(skus).forEach(sku => {
  //   console.log(skus[sku]);
  //   if (skus[sku].quantity) {
  //     return true;
  //   }
  // });

  for (var i = 0; i < skuArr.length; i++) {
    var sku = skus[skuArr[i]];
    if (sku.quantity) {
      return true;
    }
  }

  return false;
};