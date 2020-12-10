'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const router = express.Router();


app.get('/threads/3721727/bils-vouches/', async function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  fs.appendFile('index.html', new Date () + ": " + ip + "<br>", function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  res.send("tagId is set to " + req.params.tagId);
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));



module.exports = app;
module.exports.handler = serverless(app);
