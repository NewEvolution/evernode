'use strict'

const Note = require('../models/note');

module.exports = {
  index (req, res) {
    Note.find({}).sort('-_id').exec((err, notes) => {
      if (err) throw err;
      res.render('notes-index', {notes: notes});
    });
  },

  newNote (req, res) {
    res.render('new-note');
  },

  showNote (req, res) {
    res.render('show-note', {note: req.note})
  },

  createNote (req, res) {
    Note.create(req.body, err => {
      if (err) throw err;
      res.redirect('/notes');
    });
  },

  editNote (req, res) {
    res.render('new-note', {note: req.note})
  },

  updateNote (req, res) {
    req.note.update(req.body, err => {
      if (err) throw err;
      res.redirect(`/notes/${req.note._id}`);
    });
  },

  deleteNote (req, res) {
    Note.findByIdAndRemove(req.params.id, err => {
      if (err) throw err;
      res.redirect('/notes');
    })
  }
}
