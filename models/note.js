'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Notes', Schema({
  category: {type: Schema.Types.ObjectId, ref: 'Categories'},
  title: String,
  text: String
}));
