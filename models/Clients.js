var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  companyName: String,
  cnpj: String,
  phone: String,
  name: String,
  email: String,
  contact1: String,
  contact2: String,
  address : {
  	zipCode: String,
  	number : String,
  	complement: String,
  	street: String,
  	district: String,
  	city: String,
  	state: String,
	country: String
  },
  companyId: String,
});

module.exports = mongoose.model('Client', ClientSchema);
