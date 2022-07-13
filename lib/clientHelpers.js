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
  let avgRating = ((total / count) / 5 * 100).toFixed(0);
  return avgRating + '%';

  // let avgRating = Number((total / count).toFixed(2));

  // Round average rating to nearest quarter of a review point
  // let fullStar = Math.trunc(avgRating);
  // let points = Math.round(((avgRating - fullStar) * 100));
  // let remainder = points % 25;
  // let partialStar = remainder >= 13
  //   ? Number(((points - remainder + 25) / 100).toFixed(2))
  //   : Number(((points - remainder) / 100).toFixed(2));
  // let starRating = fullStar + partialStar;

  // return starRating / 5 * 100 + '%';
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