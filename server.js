'use strict';

const path = require('path');
const express = require('express');
const favicon = require('favicon'); // eslint-disable-line no-unused-vars
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodeSass = require('node-sass-middleware');
const methodOverride = require('method-override');

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

const logger = require('./lib/logger');
const routes = require('./routes/');
const app = express();

app.locals.title = "Evernode";
app.locals.year = date.getFullYear();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(nodeSass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

app.use(routes);

app.get('/', (req, res) => {
  res.render('index');
});

mongoose.connect(MONGO_URL);

mongoose.connection.on('open', err => {
  if (err) throw err;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`); // eslint-disable-line no-console
  });
});
