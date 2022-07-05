const axios = require('axios');
const API_KEY = require('./config.js');

let getData = (url, param, callback) => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}${param}`,
    headers: {
      'Authorization': `${API_KEY.TOKEN}`
    }
  };
  axios(options)
    .then((data) => {
      callback(null, data.data);
    })
    .catch((error) => {
      callback(error);
    });
};

module.exports.getData = getData;