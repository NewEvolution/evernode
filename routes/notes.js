'use strict'

const router = require('express').Router();

const auth = require('../lib/auth');
router.use(auth);

const Note = require('../models/note');
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

const noteC = require('../controllers/notes');
router.get('/', noteC.index)
      .get('/new', noteC.new)
      .post('/', noteC.create)
      .get('/:id', noteC.show)
      .get('/:id/edit', noteC.edit)
      .put('/:id', noteC.update)
      .delete('/:id', noteC.delete);

module.exports = router;
