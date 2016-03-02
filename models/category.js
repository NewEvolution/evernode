'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Categories', Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Users'},
  name: String,
  desc: String
}));
