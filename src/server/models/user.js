var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: { type: String },
  password: { type: String },
  phone: { type: String },
  twitter: { type: String },
  tasks: [{type: Schema.Types.ObjectId, ref: 'tasks'}]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
