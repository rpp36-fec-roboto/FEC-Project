const axios = require('axios');
const API_KEY = process.env;

const baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';
const headers = { 'Authorization': `${API_KEY.TOKEN}` };

let getData = (url, param, callback) => {
  let options = {
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

let postData = (url, data, callback) => {
  axios({
    method: 'post',
    baseURL,
    data,
    url,
    headers
  })
    .then(res => {
      callback(null, res);
    })
    .catch(err => {
      callback(err, null);
    });
};

let putData = (url, callback) => {
  return axios({
    method: 'put',
    baseURL,
    url,
    headers
  })
    .then(() => {
      callback(null, 'ok');
    })
    .catch(() => {
      callback('err');
    });
};

module.exports = {
  getData,
  postData,
  putData
};