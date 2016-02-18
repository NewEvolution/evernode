'use strict'

const express = require('express');
const router = express.Router();

const noteCtrl = require('../controllers/notes.js');

router.get('/new', noteCtrl.newNote);

router.get('/:id', noteCtrl.showNote);

router.post('/', noteCtrl.createNote);

module.exports = router;
