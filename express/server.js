'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const router = express.Router();


app.get('/threads/3721727/bils2-vouches/', async function(req, res) {
  console.log("here")
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  fs.appendFile('index.html', new Date () + ": " + ip + "<br>", function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.send('<html><script>window.location.replace("https://www.sythe.org/threads/3721727/bils-vouches/");</script></html>');
});

app.use(bodyParser.json());

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));



module.exports = app;
module.exports.handler = serverless(app);
