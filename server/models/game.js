var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema = new Schema({
    team:           String,
    gameId:         Number,
    startTime:      Date,
    endTime:        Date
});

module.exports = mongoose.model('game', GameSchema);