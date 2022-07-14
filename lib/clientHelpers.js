module.exports.findDefaultStyle = (productStyle) => {
  return productStyle.results.find(style => style['default?']);
};

module.exports.calculateRating = (ratings) => {
  var total = 0;
  var count = 0;

  // Calculate average rating
  for (var rate in ratings) {
    total += rate * ratings[rate];
    count += Number(ratings[rate]);
  }

  // return percentage of rating to set as the width of the solid stars
  let avgRating = (Math.round((total / count) / 5 * 100 / 5) * 5).toFixed(0);
  return avgRating + '%';
};

module.exports.inStock = (skus) => {
  var skuArr = Object.keys(skus);

  for (var i = 0; i < skuArr.length; i++) {
    var sku = skus[skuArr[i]];
    if (sku.quantity) {
      return true;
    }
  }

  return false;
};

module.exports.isInYourOutfit = (productId, yourOutfit) => {
  return yourOutfit.includes(Number(productId));
};