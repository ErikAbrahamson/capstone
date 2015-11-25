var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    passport = require('passport'),
    Task = require('../models/task.js'),
    mongoose = require('mongoose-q')(require('mongoose'), { spread: true });

router.post('/user/:id/task', function(req, res, next) {
    var newTask = new Task(req.body);
    newTask.saveQ();
    var update = { $push : {tasks : newTask }};
    var options = { new:true };
    var id = req.params.id;

    User.findByIdAndUpdateQ(id, update, options)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});

router.post('/task', function(req, res, next) {
    var newTask = new Task(req.body);
    newTask.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});

router.get('/user/task', function(req, res, next) {
  task.findQ().then(function(result) {
      res.json(result);
    }).catch(function(error) {
      res.send(error);
    }).done();
});

module.exports = router;
