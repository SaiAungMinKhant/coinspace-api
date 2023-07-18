const express = require('express');
const app = express();
const dotenv = require('dotenv');
const axios = require('axios');
const port = 5000
dotenv.config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  axios
    .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start: 1,
        limit: 100,
        convert: 'USD',
        sort: 'market_cap',
      },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
      },
    })
    .then(response => {
      const data = response.data.data;
      res.json(data);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred' });
    });
});

app.listen(process.env.PORT || port, () =>{
  console.log(`Listening on port ${port}`)
})
