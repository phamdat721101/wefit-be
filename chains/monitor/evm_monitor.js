const fetch = require('node-fetch');

const url = 'https://feed-api.cielo.finance/api/v1/feed';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'a9938abc-360b-4914-b84a-3c429d2370ba'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then((json) => {
    console.log(json.data)
  })
  .catch(err => console.error('error:' + err));