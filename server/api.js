const axios = require('axios');
const API_KEY = require('./config.js');

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const headers = { 'Authorization': `${API_KEY.TOKEN}` };

let getData = (url, param, callback) => {
  let options = {
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}${param}`,
    url,
    baseURL,
    params: param,
    method: 'get',
    headers
  };
  axios(options)
    .then((data) => {
      callback(null, data.data);
    })
    .catch((error) => {
      callback(error);
    });
};

let postData = (url, data) => {
  return axios({
    method: 'post',
    baseURL,
    data,
    url,
    headers
  });
};

module.exports = {
  getData,
  postData
};