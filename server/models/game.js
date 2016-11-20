var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema = new Schema({
    redName: 		String,
    blueName: 		String,
    red:            [],
    blue:           [],
    name:           String,
    startTime:      Date,
    endTime:        Date,
    key:            String
});

module.exports = mongoose.model('game', GameSchema);