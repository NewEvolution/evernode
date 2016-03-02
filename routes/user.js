'use strict';

const router = require('express').Router();

const userC = require('../controllers/user');

require('../lib/local');

module.exports = router.get('/login', userC.index)
  .post('/login', userC.login)
  .delete('/login', userC.delete)
  .put('/register', userC.populate)
  .get('/register', userC.register)
  .post('/register', userC.new);

