'use strict'

const Category = require('../models/category');

module.exports = {
  index (req, res) {
    Category.find({}).sort('name').exec((err, categories) => {
      if (err) throw err;
      res.render('cat-index', {categories: categories});
    });
  },

  new (req, res) {
    res.render('cat-new');
  },

  create (req, res) {
    req.body.user = req.user._id;
    Category.create(req.body, err => {
      if (err) throw err;
      res.redirect('/categories');
    });
  },

  show (req, res) {
    res.render('cat-show', {category: req.category});
  },

  edit (req, res) {
    res.render('cat-new', {category: req.category})
  },

  update (req, res) {
    req.category.update(req.body, err => {
      if (err) throw err;
      res.redirect(`/categories/${req.category._id}`);
    })
  },

  delete (req, res) {
    Category.findByIdAndRemove(req.params.id, err => {
      if (err) throw err;
      res.redirect('/categories');
    })
  }
}
