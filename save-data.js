'use strict';
//=============================================================================
const
  controlFlow = require('async'),
  Categories = require('./data-model'),
  sendEmail = require('./send-email'),
  objectPath = require('object-path');
//=============================================================================
module.exports = data => {
  console.log('received scraper results data....');
  console.log('about to start saving...');
  controlFlow.each(data, (categoryObj, cb) => {
    const category = Object.keys(categoryObj)[0];
    Categories.create({
      category: category,
      url: objectPath.get(categoryObj, [category, "URL"])
    }, (err, categoryData) => {
      if(err) {
        cb(err);
      }
      return cb();
    });
  }, err => {
    if(err) {
      console.log('there was an error saving the data');
      console.error(err);
      return sendEmail(err);
    } else {
      console.log('successfully finished saving data to dbase');
      return sendEmail();
    }
  });
}
//=============================================================================
