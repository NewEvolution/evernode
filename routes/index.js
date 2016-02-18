'use strict'

const express = require('express');
const router = express.Router();

const notesRoutes = require('./notes');

router.use('/notes', notesRoutes);

module.exports = router;
