'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.all('/*', (req, res) => {
  var date = new Date();
  console.log(date.toString(), ip)
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  res.set('location', 'https://www.sythe.org/threads/3721727/bils-vouches/');
  res.status(301).send()
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));


module.exports = app;
module.exports.handler = serverless(app);
