'use strict'

const Note = require('../models/note');

module.exports.newNote = (req, res) => {
  res.render('new-note');
};

module.exports.showNote = (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (err) throw err;
    res.render('show-note', {note: note})
  });
};

module.exports.createNote = (req, res) => {
  Note.create(req.body, (err, note) => {
    if (err) throw err;
    res.redirect(`/notes/${note._id}`);
  });
};

module.exports.deleteNote = (req, res) => { // eslint-disable-line no-unused-vars
};
