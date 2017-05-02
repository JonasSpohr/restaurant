var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Place', PlaceSchema);
