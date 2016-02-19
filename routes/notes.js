'use strict'

const express = require('express');
const router = express.Router();

const Note = require('../models/note');
const noteC = require('../controllers/notes');

router.param('id', (req, res, next, id) => {
  Note
    .findById(id)
    .populate('category')
    .exec((err, note) => {
      if (err) throw err;
      req.note = note;
      next();
    });
});

router.get('/', noteC.index)
      .get('/new', noteC.new)
      .get('/:id', noteC.show)
      .get('/:id/edit', noteC.edit)
      .put('/:id', noteC.update)
      .delete('/:id', noteC.delete)
      .post('/', noteC.create);

module.exports = router;
