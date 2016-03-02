'use strict'

const Note = require('../models/note');
const Category = require('../models/category');

module.exports = {
  index (req, res) {
    Note.find({}).sort('-_id').exec((err, notes) => {
      if (err) throw err;
      res.render('note-index', {notes: notes});
    });
  },

  new (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;
      res.render('note-new', {categories: categories});
    });
  },

  show (req, res) {
    res.render('note-show', {note: req.note})
  },

  create (req, res) {
    req.body.user = req.user._id;
    Note.create(req.body, err => {
      if (err) throw err;
      res.redirect('/notes');
    });
  },

  edit (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;
      res.render('note-new', {note: req.note, categories: categories})
    });
  },

  update (req, res) {
    req.note.update(req.body, err => {
      if (err) throw err;
      res.redirect(`/notes/${req.note._id}`);
    });
  },

  delete (req, res) {
    Note.findByIdAndRemove(req.params.id, err => {
      if (err) throw err;
      res.redirect('/notes');
    })
  }
}
