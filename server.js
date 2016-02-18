'use strict';

const express = require('express');
const favicon = require('favicon'); // eslint-disable-line no-unused-vars
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const date = new Date();
const localPort = 3000;
const localMongoPort = 27017;
const port = process.env.PORT || localPort;
const MONGO_PORT = process.env.MONGO_PORT || localMongoPort;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_USER = process.env.MONGO_USER || '';
const MONGO_PASS = process.env.MONGO_PASS || '';
const MONGO_AUTH = MONGO_USER ? `${MONGO_USER}:${MONGO_PASS}@` : '';
const MONGO_URL = `mongodb://${MONGO_AUTH}${MONGO_HOST}:${MONGO_PORT}/evernode`;

const routes = require('./routes/');
const app = express();

app.locals.title = "Evernode";
app.locals.year = date.getFullYear();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');

app.use(routes);

app.get('/', (req, res) => {
  res.send('<h1>Yo</h1>');
});

mongoose.connect(MONGO_URL);

mongoose.connection.on('open', err => {
  if (err) throw err;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`); // eslint-disable-line no-console
  });
});
