'use strict';

const favicon = require('favicon'); // eslint-disable-line no-unused-vars

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const SESS_SECRET = process.env.SESS_SECRET || 'DevPasswordYo';
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
app.use(session({
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    url: REDIS_URL
  })
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const path = require('path');
const nodeSass = require('node-sass-middleware');
app.use(nodeSass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

const logger = require('./lib/logger');
app.use(logger);

const flash = require('connect-flash');
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const date = new Date();
app.locals.title = "Evernode";
app.locals.year = date.getFullYear();

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/');
app.use(routes);

app.get('*', (req, res) => {
  res.render('login');
});

const mongoose = require('mongoose');
const localMongoPort = 27017;
const MONGO_PORT = process.env.MONGO_PORT || localMongoPort;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_USER = process.env.MONGO_USER || '';
const MONGO_PASS = process.env.MONGO_PASS || '';
const MONGO_AUTH = MONGO_USER ? `${MONGO_USER}:${MONGO_PASS}@` : '';
const MONGO_URL = `mongodb://${MONGO_AUTH}${MONGO_HOST}:${MONGO_PORT}/evernode`;
mongoose.connect(MONGO_URL);

const localPort = 3000;
const PORT = process.env.PORT || localPort;
mongoose.connection.on('open', err => {
  if (err) throw err;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
  });
});
