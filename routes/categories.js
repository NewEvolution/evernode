'use strict'

const router = require('express').Router();

const auth = require('../lib/auth');
router.use(auth);

const Note = require('../models/note');
const Category = require('../models/category');
router.param('id', (req, res, next, id) => {
  Category.findById(id, (err, category) => {
    if (err) throw err;
    req.category = category;
    Note.find({category: id}, (err, notes) => {
      if (err) throw err;
      req.category.notes = notes;
      next();
    });
  });
});

const categoriesC = require('../controllers/categories');
router.get('/', categoriesC.index)
      .get('/new', categoriesC.new)
      .post('/', categoriesC.create)
      .get('/:id', categoriesC.show)
      .get('/:id/edit', categoriesC.edit)
      .put('/:id', categoriesC.update)
      .delete('/:id', categoriesC.delete);

module.exports = router;
