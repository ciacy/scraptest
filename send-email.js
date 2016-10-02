'use strict';
//=============================================================================
const
  nodemailer = require('nodemailer'),
  sgTransport = require('nodemailer-sendgrid-transport'),
  email = process.env.EMAIL,
  sender = process.env.FROM;
//=============================================================================
const
  sgtOptions = {
    auth: {
        api_user: process.env.SendGridUsername,
        api_key: process.env.SendGridPassword
      }
    },
  mailer = nodemailer.createTransport(sgTransport(sgtOptions));
//=============================================================================
module.exports = function (err) {
  console.log('about to send email...');
  let msg;
  if(err) {
    msg = {
      to: email,
      from: sender,
      subject: 'There was an error running the web scraper',
      text: err
    };
  } else {
    msg = {
      to: email,
      from: sender,
      subject: 'Your research results',
      text: 'The data has been succesfully parsed, timestamp is before ' + new Date()
    };
  }

  //send email
  mailer.sendMail(msg, (err, res) => {
    if(err) {
      console.error(err);
      process.exit(1);
      }
      console.log('email sent, exiting app....');
      process.exit(0);
  });
};
