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

  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "timegawd1@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
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
