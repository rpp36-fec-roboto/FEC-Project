const express = require('express');
const path = require('path');
const app = express();
const PORT = 5555;
const api = require('./api.js');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set up route to send back html file that points to static assets of bundle.js
app.get('/:product_id', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.get('/qa/questions', (req, res) => {
  // var param = req._parsedOriginalUrl.search; //will give you the product_id param  ?product_id=71697
  var param = req.query;
  api.getData('/qa/questions', param, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error getting data from the API');
    } else {
      res.send(data);
    }
  });
});


app.get('/qa/questions/:question_id/answers', (req, res) => {
  var param = req._parsedOriginalUrl.search;
  api.getData(req._parsedOriginalUrl.pathname, param, (err, data) => {
    if (err) {
      res.status(404).send('Error getting data from the API');
    } else {
      res.send(data);
    }
  });
});

app.get('/reviews/meta', (req, res) => {
  var param = req.query;
  var url = 'reviews/meta';
  api.getData(url, param, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/products/:product_id', (req, res) => {
  var pathVariable = req.params.product_id;
  var url = `products/${pathVariable}`;

  api.getData(url, {}, (err, data) => {
    if (err) {
      res.status(500).send('Error getting data from the API');
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  var pathVariable = req.params.product_id;
  var url = `products/${pathVariable}/styles`;

  api.getData(url, {}, (err, data) => {
    if (err) {
      res.status(500).send('Error getting data from the API');
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/products/:product_id/related', (req, res) => {
  var pathVariable = req.params.product_id;
  var url = `products/${pathVariable}/related`;

  api.getData(url, {}, (err, data) => {
    if (err) {
      res.status(500).send('Error getting data from the API');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/cart', (req, res) => {
  console.log(req.body);
  let sku = Number(req.body.sku);

  api.postData('cart', { 'sku_id': sku })
    .then(response => {
      res.sendStatus(201);
    })
    .catch( err => {
      res.status(500).send( err );
    });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


