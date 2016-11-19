var mongoose = require("mongoose");
var Game = require("../models/game");

module.exports.addGame = function (req, res) {
    var game = new Game(req.body);
    game.
        save().
        then(function () {
            res.sendStatus(200);
        }).
        catch(function (err) {
            res.sendStatus(err);
        });
}