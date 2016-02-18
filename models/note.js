'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.model('Notes', mongoose.Schema({
  title: String,
  text: String
}));
