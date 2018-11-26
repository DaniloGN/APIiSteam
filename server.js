var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Game = require('./api/models/iSteamGameModel'), //created model loading here
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
uri = "mongodb://uppeuhxiuxrtgsi:2xOirsV9wn1w5eaUNDuj@btlegvwlgrxnlmz-mongodb.services.clever-cloud.com:27017/btlegvwlgrxnlmz";
mongoose.connect(uri);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/iSteamRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);