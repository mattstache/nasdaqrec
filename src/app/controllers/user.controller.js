'use strict';

//var mongoose = require('mongoose')

//models
const User = require('../model/User.model');
const bcrypt = require('bcrypt-nodejs');

module.exports.createUser = function(req, res){
	console.log('request to create user');
	var data = {
		email: req.body.email,
		hash: req.body.password
	};

	var newUser = new User(data);

	newUser.save(function(err, user){
		return res.send(user);
	});
}

module.exports.getUserById = function(req, res, next){
	console.log('request to get user');

	User.findById(req.params.id, function(err, user){
		if (err) { return next(err)};
		if (!user){ return res.status(404).send('user not found') };

		return res.json(user);
	});
}

module.exports.getAllUsers = function(req, res, next){
	User.find({}, function(err, users) {
		if (err) { return next(err)};
		if (users.length === 0){ return res.json([]); };

		return res.json(users);
	});
};

module.exports.updateUser = function(req, res, next){
	console.log('request to update user');
	User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
		if (err) { return next(err)};
		if(!user){ return res.status(404).send('No user with that id')};

		return res.json(user);
	});
}

module.exports.deleteUserById = function(req, res, next){
	console.log('request to delete user');
	console.log(req.params.id)
	 User.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        return res.sendStatus(200);
    });
}

module.exports.getStocksByUserId = function(req, res, next){
	console.log('request to get user\'s stocks');
	User.findById(req.params.id, function(err, user){
		if (!user){ return res.status(404).send('user not found') };

		return res.json(user.stocks);
	});
}