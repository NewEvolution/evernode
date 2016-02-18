'use strict'

const express = require('express');
const router = express.Router();

const Note = require('../models/note');
const noteCtrl = require('../controllers/notes');

router.param('id', (req, res, next, id) => {
  Note.findById(id, (err, note) => {
    if (err) throw err;
    req.note = note;
    next();
  });
});

router.get('/', noteCtrl.index);
router.get('/new', noteCtrl.newNote);
router.get('/:id', noteCtrl.showNote);
router.get('/:id/edit', noteCtrl.editNote);
router.put('/:id', noteCtrl.updateNote);
router.delete('/:id', noteCtrl.deleteNote);
router.post('/', noteCtrl.createNote);

module.exports = router;
