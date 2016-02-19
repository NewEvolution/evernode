'use strict'

const Note = require('../models/note');
const Category = require('../models/category');

module.exports = {
  index (req, res) {
    Note.find({}).sort('-_id').exec((err, notes) => {
      if (err) throw err;
      res.render('notes-index', {notes: notes});
    });
  },

  new (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;
      res.render('new-note', {categories: categories});
    });
  },

  show (req, res) {
    res.render('show-note', {note: req.note})
  },

  create (req, res) {
    Note.create(req.body, err => {
      if (err) throw err;
      res.redirect('/notes');
    });
  },

  edit (req, res) {
    Category.find({}, (err, categories) => {
      if (err) throw err;
      res.render('new-note', {note: req.note, categories: categories})
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
