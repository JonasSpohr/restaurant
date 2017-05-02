var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
	date: Date,
	votes: Number
});

var PlaceSchema = new mongoose.Schema({
	name: String,
	history: [HistorySchema]
});

module.exports = mongoose.model('Place', PlaceSchema);
