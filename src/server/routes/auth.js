var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user.js');

router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(error, account) {
    if (error) return res.status(500).json({ error: error });
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({ status: 'Registration successful!'});
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(error, user, info) {
    if (error) return res.status(500).json({ error: error });
    if (!user) return res.status(401).json({ error: info });
    req.logIn(user, function(error) {
      if (error) {
        return res.status(500).json({error: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;
