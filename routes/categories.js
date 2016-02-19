'use strict'

const express = require('express');
const router = express.Router();

const Note = require('../models/note');
const Category = require('../models/category');
const categoriesC = require('../controllers/categories');

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

router.get('/', categoriesC.index)
      .post('/', categoriesC.create)
      .get('/new', categoriesC.new)
      .get('/:id', categoriesC.show);

module.exports = router;
