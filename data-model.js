'use strict';
//=============================================================================
const mongoose = require('mongoose');
//=============================================================================
const CategorySchema = mongoose.Schema({
  category: String,
  url: String,
  createdOn: {
    type: Date,
    default: Date.now
  }
});
//=============================================================================
const CategoryModel = mongoose.model('Category', CategorySchema);
//=============================================================================
module.exports = CategoryModel;
//=============================================================================
