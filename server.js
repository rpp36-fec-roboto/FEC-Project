const express = require('express');
const path = require('path');
const app = express();
const PORT = 5555;
const api = require('./api.js');

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/qa/questions', (req, res) => {
  var param = req._parsedOriginalUrl.search; //will give you the product_id param  ?product_id=71697
  api.getData('/qa/questions', param, (err, data) => {
    if (err) {
      res.status(404).send('Error getting data from the API');
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

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


