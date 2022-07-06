const express = require('express');
const path = require('path');
const app = express();
const PORT = 5555;
const api = require('./api.js');

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/qa/questions', (req, res) => {
  // var param = req._parsedOriginalUrl.search; //will give you the product_id param  ?product_id=71697
  var param = req.query;
  api.getData('/qa/questions', param, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send('Error getting data from the API');
    } else {
      res.send(data);
    }
  });
});

app.get('/products', (req, res) => {
  var pathVariable = req.query.product_id;
  var url = `products/${pathVariable}`;

  api.getData(url, {}, (err, data) => {
    if (err) {
      res.status(500).send('Error getting data from the API');
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/products/styles', (req, res) => {
  var pathVariable = req.query.product_id;
  var url = `products/${pathVariable}/styles`;

  api.getData(url, {}, (err, data) => {
    if (err) {
      res.status(500).send('Error getting data from the API');
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


