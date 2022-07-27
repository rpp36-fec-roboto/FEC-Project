const axios = require('axios');
const API_KEY = require('./imgurconfig.js');

const baseURL = 'https://api.imgur.com/3/upload/';
const headers = {
  'Content-type': 'application/json',
  'Authorization': `Client-ID ${API_KEY.TOKEN}`
};


let postData = (data, callback) => {
  axios({
    method: 'post',
    baseURL,
    data,
    headers
  })
    .then(res => {
      callback(null, res);
    })
    .catch(err => {
      callback(err, null);
    });
};

module.exports = {postData};