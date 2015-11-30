var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    passport = require('passport'),
    Task = require('../models/task.js'),
    mongoose = require('mongoose-q')(require('mongoose'), { spread: true });

router.get('/user/:id/tasks', function(req, res, next) {
  User.findById(req.params.id)
    .populate('tasks').exec(function(error, user) {
    if (error) res.json(error);
    else res.json(user.tasks);
  });
});

router.post('/user/:id/task', function(req, res, next) {
  var newTask = new Task(req.body);
    newTask.saveQ();
    var update = { $push : {tasks : newTask }}, options = {
       new: true,
       upsert : true
    }, id = req.params.id;

    User.findByIdAndUpdateQ(id, update, options)
      .then(function(result) { res.json(result); })
      .catch(function(error) { res.send(error); });
});

router.get('/user/:userid/task/:taskid', function(req, res, next) {
  var user = req.params.userid, task = req.params.taskid;
  User.findByIdQ(user)
    .then(function(result) {
      Task.findByIdQ(task)
        .then(function(result) {
          res.json(result);
        });
      })
    .catch(function(error) {
      res.send(error);
    }).done();
});

router.put('/user/:userid/task/:taskid', function(req, res, next) {
  var user = req.params.userid, task = req.params.taskid,
    options = { new: true };
  User.findByIdQ(user)
    .then(function(result) {
      Task.findOneAndUpdateQ(task, req.body, options)
        .then(function(result) {
          res.json({ 'Updated:': result});
        });
      })
    .catch(function(error) {
      res.send(error);
    }).done();
});

router.delete('/user/:userid/task/:taskid', function(req, res, next) {
  var user = req.params.userid, task = req.params.taskid;
  User.findByIdQ(user)
    .then(function(result) {
      Task.findByIdAndRemoveQ(task)
        .then(function(result) {
          res.json({ 'Deleted:': result });
        });
      })
    .catch(function(error) {
      res.send(error);
    }).done();
});

module.exports = router;
