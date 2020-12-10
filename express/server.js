'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

// const router = express.Router();
// router.all('/*', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Expres4s.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));

// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.get("/foo", function(req,res){
  res.send('foo');
});

//////////////
var router = express.Router();

router.get("/bar", function(req,res,next){
  res.send('bar');
});

app.use("/",router);

module.exports = app;
module.exports.handler = serverless(app);
