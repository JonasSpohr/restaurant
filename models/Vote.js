var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
	date: {type: Date, default: Date.now},
	userId: String,
	placeId: String
});

module.exports = mongoose.model('Vote', VoteSchema);