var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Task = new Schema({
  title: { type: String },
  description: { type: String },
  deadline: { type: Date },
  priority: { type: Number },
  complete: { type: String },
  severity: { type: Number },
  punishment_type: {
    donation: { type: Boolean },
    text_message: { type: Boolean }
  }
});

Task.plugin(passportLocalMongoose);
module.exports = mongoose.model('tasks', Task);
