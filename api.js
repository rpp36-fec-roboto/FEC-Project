const axios = require('axios');

let getData = (url, token, param, callback) => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${url}${param}`,
    headers: {
      'Authorization': `${token}`
    }
  };
  axios(options)
    .then((data) => {
      callback(null, data.data);
    })
    .catch((error) => {
      console.log('error getting data from api');
    });
};

module.exports = getData;