var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema = new Schema({
	timestamp: 		Date,
	entity: 		String,
	gameID: 		String,
	team: 			String,
	stat: 			String,
	value: 			Number	
});

module.exports = mongoose.model('Event', EventSchema);