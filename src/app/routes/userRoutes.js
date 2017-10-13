'use strict';

var mongoose = require('mongoose');
var userHandler = require('../controllers/user.controller.js');
var express = require('express');

var router = express.Router();
//const Stock = require('../model/User.model')

router.get('/', function(req, res){
	res.send('API initialized')
});

// //get all lists
//router.get('/all', stockHandler.show_all_stocks);

module.exports = router;