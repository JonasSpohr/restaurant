var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
});

module.exports = mongoose.model('User', UserSchema);
