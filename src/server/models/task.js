var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Task = new Schema({
  title: String,
  description: String,
  deadline: Date,
  priority: Number,
  complete: String,
  severity: Number,
  punishment_type: {
    donation: Boolean,
    twitter_post: Boolean
  }
});

Task.plugin(passportLocalMongoose);
module.exports = mongoose.model('tasks', Task);
