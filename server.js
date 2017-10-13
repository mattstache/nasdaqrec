//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var jsonwebtoken = require("jsonwebtoken");
//and create our instances
var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

const db = 'mongodb://localhost/nasdaqrec';
mongoose.Promise = global.Promise;

// Using `mongoose.connect`...
var promise = mongoose.connect(db, {
  useMongoClient: true,
  /* other options */
});




promise.then(function(db) {


	if (app.get('env') === 'development') var dev = true;
	// logger in dev mode (morgan)
	//if (dev) app.use(logger('dev'));

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	//To prevent errors from Cross Origin Resource Sharing, we will set 
	//our headers to allow CORS with middleware like so:
	app.use(function(req, res, next) {
	 res.setHeader('Access-Control-Allow-Origin', '*');
	 res.setHeader('Access-Control-Allow-Credentials', 'true');
	 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
	 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
	//and remove cacheing so we get the most recent comments
	 res.setHeader('Cache-Control', 'no-cache');
	 next();
	}); 

	//now we can set the route path & initialize the API
	//Define our routes
	// var listRoutes = require('./src/app/routes/listRoutes');
	// var authRoutes = require('./src/app/routes/authRoutes');

	//Use our router configuration when we call /api
	// app.use('/api/list', listRoutes);
	// app.use('/api/auth', authRoutes);

	// app.get('/', function(req, res){
	// 	res.send('API initialized')
	// });


	app.use(express.static(__dirname + "/dist"));

	app.get('/:symbol', function(req, res){
		res.send('symbol sent')
	});

	//now we can set the route path & initialize the API
	//Define our routes
	var stockRoutes = require('./src/app/routes/stockRoutes');

	//Use our router configuration when we call /api
	app.use('/api/stock', stockRoutes);

	//starts the server and listens for requests
	app.listen(port, function() {
	 console.log(`API running on port ${port}`);
	});

});