var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  phone: String,
  site: String,
  address : {
  	zipCode: String,
  	number : String,
  	complement: String,
  	street: String,
  	district: String,
  	city: String,
  	state: String
  }
});

module.exports = mongoose.model('Company', CompanySchema);
