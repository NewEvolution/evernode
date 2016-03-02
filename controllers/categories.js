'use strict'

const Category = require('../models/category');

module.exports = {
  index (req, res) {
    Category.find({}).sort('name').exec((err, categories) => {
      if (err) throw err;
      res.render('cat-index', {categories: categories});
    });
  },

  create (req, res) {
    req.body.user = req.user._id;
    Category.create(req.body, err => {
      if (err) throw err;
      res.redirect('/categories');
    });
  },

  edit (req, res) {
    res.render('cat-new', {category: req.category})
  },

  new (req, res) {
    res.render('cat-new');
  },

  show (req, res) {
    res.render('cat-show', {category: req.category});
  }
}
