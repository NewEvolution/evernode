'use strict'

const router = require('express').Router();

const notesR = require('./notes');
const categoriesR = require('./categories');

module.exports = router.use('/notes', notesR)
  .use('/categories', categoriesR);
