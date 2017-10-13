'use strict';

var mongoose = require('mongoose')

//models
const User = require('../model/User.model');

exports.createUser = function(req, res){
	console.log('request to create user');
}

exports.getUser = function(req, res){
	console.log('request to get user');
}

exports.updateUser = function(req, res){
	console.log('request to update user');
}

exports.deleteUser = function(req, res){
	console.log('request to delete user');
}