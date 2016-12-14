var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  pwd: String,
  active: Number,
  companyId : String,
  type: String,
  phone: String,
  address: {
		zipCode: String,
		number: String,
		complement: String,
		street: String,
		district: String,
		city: String,
		state: String
	}
});

module.exports = mongoose.model('User', UserSchema);
