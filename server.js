var express = require('express'),
var cors = require('cors'),
app = express(),
port = process.env.PORT || 8080,
mongoose = require('mongoose'),
Game = require('./api/models/iSteamGameModel'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
uri = "mongodb://uppeuhxiuxrtgsi:2xOirsV9wn1w5eaUNDuj@btlegvwlgrxnlmz-mongodb.services.clever-cloud.com:27017/btlegvwlgrxnlmz";
mongoose.connect(uri);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())

var routes = require('./api/routes/iSteamRoutes'); //importing route
routes(app); //register the route
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);