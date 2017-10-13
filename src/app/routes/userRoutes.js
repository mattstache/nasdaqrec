'use strict';

var mongoose = require('mongoose');
var users = require('../controllers/user.controller.js');
var express = require('express');

var router = express.Router();
//const Stock = require('../model/User.model')

router.get('/', function(req, res){
	res.send('API initialized')
});

router.post('/', users.createUser);
router.delete('/', users.deleteUser);


//delete an entire list
//router.delete('/:id', userHandler.delete_stock_by_id)

// //get all lists
//router.get('/all', stockHandler.show_all_stocks);

module.exports = router;