var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  active: Number,
  companyId : String,
  type: String,
  phone: String
});

module.exports = mongoose.model('User', UserSchema);
