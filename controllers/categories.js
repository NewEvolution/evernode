'use strict'

const Category = require('../models/category');

module.exports = {
  index (req, res) {
    Category.find({}).sort('name').exec((err, categories) => {
      if (err) throw err;
      res.render('categories-index', {categories: categories});
    });
  },

  create (req, res) {
    Category.create(req.body, err => {
      if (err) throw err;
      res.redirect('/categories');
    });
  },

  edit (req, res) {
    res.render('new-category', {category: req.category})
  },

  new (req, res) {
    res.render('new-category');
  },

  show (req, res) {
    res.render('show-category', {category: req.category});
  }
}
