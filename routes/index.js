'use strict'

const router = require('express').Router();

const userR = require('./user');
const notesR = require('./notes');
const categoriesR = require('./categories');

module.exports = router.use('/notes', notesR)
  .use('/categories', categoriesR)
  .use('/', userR);
