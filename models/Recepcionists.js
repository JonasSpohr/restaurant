var mongoose = require('mongoose');

var RecepcionistSchema = new mongoose.Schema({
	name: String,
	mobile: String,
	phone: String,
	email: String,
	skype: String,
	cnpj: String,
	dateOfBirth: String,
	cpf: String,
	rg: String,
	carteiraTrabalho: String,
	pis: String,
	fatherName: String,
	motherName: String,
	gender: String,
	bankAccount: String,
	address: {
		zipCode: String,
		number: String,
		complement: String,
		street: String,
		district: String,
		city: String,
		state: String
	},
	profile: {
		height: String,
		weight: String,
		manequin: String,
		shoesSize: String,
		eyes: String,
		hair: String,
		skin: String,
		languages: String,
		school: String,
		habilities: String,
		experience: String,
		bust: String, //busto
		waist: String, //cintura
		hip: String, //quadril
	},
	companyId: String,
});

module.exports = mongoose.model('Recepcionist', RecepcionistSchema);
