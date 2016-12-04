var mongoose = require('mongoose');

var ProviderSchema = new mongoose.Schema({
	razaoSocial: String,
	fantasiName: String,
	cnpj: String,
	phone: String,
	email: String,
	inscricaoEstadual: String,
	inscricaoMunicipal: String,
	descriptionSevice: String,
	address: {
		zipCode: String,
		number: String,
		complement: String,
		street: String,
		district: String,
		city: String,
		state: String
	},
	companyId: String,
});

module.exports = mongoose.model('Provider', ProviderSchema);
