var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema = new Schema({
    red:            [],
    blue:           [],
    name:           String,
    startTime:      Date,
    endTime:        Date,
    key:            String
});

module.exports = mongoose.model('game', GameSchema);