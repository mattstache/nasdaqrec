'use strict';

var mongoose = require('mongoose');
var users = require('../controllers/user.controller.js');
var express = require('express');

var router = express.Router();
//const Stock = require('../model/User.model')

router.param('id', function(req, res, next, id){
	if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)){
		return res.status(400).send('Invalid id');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	res.send('API initialized')
});
router.get('/all', users.getAllUsers)
router.post('/', users.createUser);
router.delete('/:id', users.deleteUserById);
router.put('/:id', users.updateUser);
router.get('/:id', users.getUserById)



//delete an entire list
//router.delete('/:id', userHandler.delete_stock_by_id)

// //get all lists
//router.get('/all', stockHandler.show_all_stocks);

module.exports = router;