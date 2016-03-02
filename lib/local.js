'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const LOGIN_SUCCESS_MSG = 'Success';
const INCORRECT_PASS_MSG = 'Incorrect email or password';
const INCORRECT_USER_MSG = 'Incorrect email or password';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

passport.use(new LocalStrategy (
  {usernameField: 'email'},
  (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) throw err;
      if (user) {
        user.authenticate(password, (err, valid) => {
          if (err) throw err;
          if (valid) {
            done(null, user, { message: LOGIN_SUCCESS_MSG });
          } else {
            done(null, null, { message: INCORRECT_PASS_MSG });
          }
        });
      } else {
        done(null, null, { message: INCORRECT_USER_MSG });
      }
    });
  })
);

