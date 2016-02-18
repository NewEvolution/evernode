'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Logs',
  mongoose.Schema({
    userAgent: String,
    route: String,
    verb: String
  })
);
