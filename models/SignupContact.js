var mongoose = require('mongoose');

var SignupContactSchema = new mongoose.Schema({
  name: String,
  companyName: String,
  phone: String,
  email: String,
  state: String,
  city: String,
  active: Number
});

module.exports = mongoose.model('SignupContact', SignupContactSchema);
