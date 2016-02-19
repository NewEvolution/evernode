'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Categories', Schema({
  name: String,
  desc: String
}));
