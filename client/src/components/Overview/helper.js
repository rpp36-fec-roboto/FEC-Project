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