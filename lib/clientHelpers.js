module.exports.findDefaultStyle = (productStyle) => {
  return productStyle.results.find(style => style['default?']);
};

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

  for (var i = 0; i < skuArr.length; i++) {
    var sku = skus[skuArr[i]];
    // console.log(sku.quantity);
    if (sku.quantity) {
      return true;
    }
  }

  return false;
};