module.exports.calculateRating = (ratings) => {
  var total = 0;
  var count = 0;

  // Calculate average rating
  for (var rate in ratings) {
    total += rate * ratings[rate];
    count += Number(ratings[rate]);
  }

  // return percentage of rating to set as the width of the solid stars
  let avgRating = Number((Math.round((total / count) / 5 * 100 / 5) * 5).toFixed(0));

  // if there is .25 star
  if ((avgRating - 5) % 20 === 0) {
    avgRating += 3;
  }
  // if there is .75 star
  if ((avgRating - 5) % 20 === 10) {
    avgRating -= 3;
  }

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

module.exports.calculateTotalReviews = (ratings) => {
  let total = 0;
  for (var rate in ratings) {
    total += Number(ratings[rate]);
  }
  return total;
};