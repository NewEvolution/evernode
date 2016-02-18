'use strict';

const express = require('express');
const favicon = require('favicon'); // eslint-disable-line no-unused-vars
const mongoose = require('mongoose'); // eslint-disable-line no-unused-vars
const bodyParser = require('body-parser');

const date = new Date();
const localPort = 3000;
const port = process.env.port || localPort;

const app = express();

app.locals.title = "Evernode";
app.locals.year = date.getFullYear();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.get('/notes/new', (req, res) => {
  res.render('new-note');
});

app.post('/notes', (req, res) => {
  res.redirect('/');
});

app.get('/', (req, res) => {
  res.send('<h1>Yo</h1>');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line no-console
});
