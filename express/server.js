'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/threads/3721727/bils-vouches/', (req, res) => {
  var date = new Date();
  console.log(date.toString(), ip)
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  res.set('location', '../index.html');
  res.status(301).send()
  res.end();
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));



module.exports = app;
module.exports.handler = serverless(app);
