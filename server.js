const express = require('express');
const path = require('path');
const app = express();
const PORT = 5555;
const api = require('./api.js');

const API_KEY = require('./config.js');

app.use(express.static(path.join(__dirname, '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/qa/questions', (req, res) => {
  var param = req._parsedOriginalUrl.search;
  api.getData('/qa/questions', API_KEY.TOKEN, param, (err, data) => {
    if (err) {
      console.log('error getting data in server');
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});


