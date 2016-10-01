'use strict';
require('dotenv').config();
//=============================================================================
const
  cp = require('child_process'),
  scraper = require('child_process').execFile,
  mongoose = require('mongoose'),
  args = ['categories.js'],
  saveData = require('./save-data'),
  sendEmail = require('./send-email'),
  DBURL = process.env.DBURL;
let db;
//=============================================================================
mongoose.connect(DBURL);
db = mongoose.connection;
db.on('error', err => {
  return  sendEmail(err.message);
});
db.once('connected', () => {
  console.log(`connected to ${DBURL}`);
  console.log('about to spawn casperjs process');

  scraper('casperjs', args, {maxBuffer: 1024 * 1024 * 100}, (err, stdout, stderr) => {
    if(err) {
      console.error('There was an error spawning casperjs process');
      console.error(err);
      return sendEmail(err);
    }
    if(stderr) {
      console.error('casperjs process had an internal error');
      return sendEmail(stderr);
    }
    console.log('casperjs process successfully ended...');
    const dataFile = JSON.parse(stdout);
    console.log('sending data for saving');
    return saveData(dataFile);
  });
});
db.once('disconnected', () => {
  return console.error(`Successfully disconnected from ${DBURL}`);
});
process.on('SIGINT', () => {
  db.close(() => {
    console.error('dBase connection closed due to app termination');
    return process.exit(0);
  });
});
//=============================================================================
