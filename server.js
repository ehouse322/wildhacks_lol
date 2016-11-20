const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const promise = require('bluebird');
mongoose.Promise = promise;

const dbURI = "mongodb://league:same@ds157677.mlab.com:57677/wildhackslol";
const options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },  
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }};
mongoose.connect(dbURI, options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/app',express.static(__dirname + "/app"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
});

const gameController = require("./server/controller/game.controller");
const eventController = require("./server/controller/event.controller");
// Game Controller
app.get("/api/game", gameController.getGames);
app.get("/api/game/gameKey/:gameKey", gameController.getGameByKey);
app.get("/api/game/:id", gameController.getGameById);
app.post("/api/game", gameController.addGame);
app.put("/api/game", gameController.editGame);
// Event Controller
app.get("/api/event", eventController.getEvents);
app.post("/api/event", eventController.addEvent);

app.listen('3000', function(){
    console.log("Listening on port 3000...");
});
