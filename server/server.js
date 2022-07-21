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

app.post('/qa/questions', (req, res) => {
  var url = req._parsedUrl.pathname;
  var param = req.body;
  param['product_id'] = Number(param['product_id']);
  api.postData(url, param, (err, data) => {
    if (err) {
      res.status(500).send('Error creating new Question');
    } else {
      res.status(201).send();
    }
  });
});


app.get('/qa/questions/:question_id/answers', (req, res) => {
  var url = req._parsedUrl.pathname;
  var param = req.query;
  api.getData(url, param, (err, data) => {
    if (err) {
      res.status(500).send('Error getting data from the API');
    } else {
      res.send(data);
    }
  });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  var url = req._parsedUrl.pathname;
  var param = req.body;
  api.postData(url, param, (err, data) => {
    if (err) {
      res.status(500).send('Error creating new answer');
    } else {
      res.status(201).send();
    }
  });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let qid = `/qa/questions/${req.params.question_id}/helpful`;
  api.putData(qid, (err, data) => {
    if (err) {
      res.status(500).send('Error updating question helpful');
    } else {
      res.status(204).send('Updated helpfulness on question');
    }
  });
});

app.put('/qa/answer/:answer_id/helpful', (req, res) => {
  let id = `/qa/answers/${req.params.answer_id}/helpful`;
  api.putData(id, (err, data) => {
    if (err) {
      res.status(500).send('Error updating answer helpful');
    } else {
      res.status(204).send('Updated helpfulness on answer');
    }
  });
});

app.put('/qa/answer/:answer_id/report', (req, res) => {
  let id = `/qa/answers/${req.params.answer_id}/report`;
  api.putData(id, (err, data) => {
    if (err) {
      res.status(500).send('Error reporting answer');
    } else {
      res.status(204).send('Updated report on answer');
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
  let sku = Number(req.body.sku);

  api.postData('cart', { 'sku_id': sku }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.post('/interactions', (req, res) => {
  let body = req.body;
  api.postData('interactions', body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


