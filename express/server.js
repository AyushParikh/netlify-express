'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
router.get('/*', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip)

  fs.appendFile('logs.html', new Date () + ": " + ip + "<br>", function (err) {
    if (err) throw err;
  });


  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

// app.get('/threads/3721727/bils2-vouches/', async function(req, res) {
//   console.log("here")
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // fs.appendFile('index.html', new Date () + ": " + ip + "<br>", function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });

//   res.send('<html><script>window.location.replace("https://www.sythe.org/threads/3721727/bils-vouches/");</script></html>');
// });
