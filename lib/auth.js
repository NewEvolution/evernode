'use strict';

module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};
