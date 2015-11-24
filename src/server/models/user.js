var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  phone: String,
  twitter: String,
  tasks: [{type: Schema.Types.ObjectId, ref: 'tasks'}]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
