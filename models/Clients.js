var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
	companyName: String,
	cnpj: String,
	phone: String,
	name: String,
	email: String,
	contact1: String,
	contact2: String,
	address: {
		zipCode: String,
		number: String,
		complement: String,
		street: String,
		district: String,
		city: String,
		state: String,
		country: String
	},
	events: [{
		created: { type: Date, default: Date.now },		
		contactName: String,		
		event: {
			type: String,
			title: String,
			place: String,
			date: Date,
			people: Number,
			timeBegin: String,
			timeEnd: String,
			mount :{
				date: Date,
				time: String 
			},
			unmount :{
				date: Date,
				time: String 
			},
			description: String,
			voltage: String,
			generator: String,
			aEb : {
				need: String,
				description: String
			},
			accommodation : {
				need: String,
				description: String
			},
			transfer : {
				need: String,
				description: String
			},
			sound : {
				need: String,
				description: String
			},
			projection : {
				need: String,
				description: String
			},
			lightCenica : {
				need: String,
				description: String
			},
			decoration : {
				need: String,
				description: String
			},
			visualComunication : {
				need: String,
				description: String
			},
			gifts : {
				need: String,
				description: String
			},
			recepcionist : {
				need: String,
				description: String
			},
			uniforms : {
				need: String,
				description: String
			},
			photographer : {
				need: String,
				name: String
			},
			filming : {
				need: String,
				name: String
			},
			clientRequests: String,
			companyDemands: String,
			providersPendency: String
		}
	}],
	companyId: String,
});

module.exports = mongoose.model('Client', ClientSchema);
