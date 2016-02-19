'use strict'

const express = require('express');
const router = express.Router();

const notesR = require('./notes');
const categoriesR = require('./categories');

router.use('/notes', notesR);
router.use('/categories', categoriesR);

module.exports = router;
