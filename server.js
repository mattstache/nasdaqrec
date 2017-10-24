//server.js
'use strict'
//first we import our dependencies…
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
//var jsonwebtoken = require("jsonwebtoken");
//and create our instances
var app = express();
var router = express.Router();

const config = require('./src/app/model/config');

var port = config.port;//process.env.API_PORT || 3001;

const db = config.dbUrl;//'mongodb://localhost:5000/nasdaqrec'
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


	app.use(express.static(__dirname + "/dist"));







	//now we can set the route path & initialize the API
	//Define our routes
	var stockRoutes = require('./src/app/routes/stockRoutes');
	var userRoutes = require('./src/app/routes/userRoutes');
	var authRoutes = require('./src/app/routes/authRoutes');
	var adminRoutes = require('./src/app/routes/adminRoutes');

	//Use our router configuration when we call /api
	app.use('/api/stock', stockRoutes);
	app.use('/api/users', userRoutes);
	app.use('/api/auth', authRoutes);
	app.use('/api/admin', adminRoutes);

	//dev error handler
	if (dev){
		app.use(logger('dev'));
	}

	require('./init/init');

	// production error handler
	app.use(function(err, req, res, next){
		res.status(err.status || 500).send();
	})

	//starts the server and listens for requests
	app.listen(port, function() {
	 console.log(`API running on port ${port}`);
	});

});