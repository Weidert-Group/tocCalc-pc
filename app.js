const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
require('dotenv').config();
var router = express.Router();

// Use express.static middleware to serve static files. Here 'public' is the directory name.
router.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname, 'public'));

// If you want to add routes, you can do so here. For example:
// app.get('/route', (req, res) => { /* handle route */ });

router.use(express.json());

router.post('/submit', (req, res) => {
  axios.post(`https://login.microsoftonline.com/${process.env.tenantId}/oauth2/v2.0/token`,`grant_type=client_credentials&client_id=${process.env.clientId}&client_secret=${process.env.clientSecret}&scope=${process.env.scopes}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
  )
  .then((response) => {
    console.log(response.data);
    console.log(req.body);
    let payloadString = JSON.stringify(req.body);
    console.log(typeof payloadString);
    let token = response.data.access_token;
    let headers = {headers: {
      'Authorization': `Bearer ${token}`, 
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'OData-MaxVersion': '4.0',
      'OData-Version': '4.0',
      'Prefer': 'return=representation'
    }};

    axios.post(`https://itwwelding.crm.dynamics.com/api/data/v9.2/leads`, req.body, headers)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  })
  .catch((error) => {
    console.log(error);
  });

});

app.use('/enpak-pc/', router);
app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));