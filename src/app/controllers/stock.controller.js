'use strict';

var mongoose = require('mongoose')
const jwt = require('jwt-simple');
const config = require('../model/config');
  //models
const Stock = require('../model/Stock.model');
const User = require('../model/User.model');

exports.show_all_stocks = function(req, res) {
	console.log('show_all_stocks');
	
	const { token } = req.cookies;
	console.log(token)
	var decoded = jwt.decode(token, config.secret);

	console.log('getuserbyid: ' + decoded.id)


	User.findOne({_id: decoded.id}).lean()
	.exec()
	.then((user) => {
		console.log('loser user')
		console.log(user)
		res.send(JSON.stringify(user.stocks));
	})
	.catch((err) => {
		console.log('an error has occurred')
		res.send('error has occurred')
	})

	//untouched for showing all stocks in stock table vs user stocks
	// Stock.find().lean()
	// .exec()
	// .then((stocks) => {
	// 	res.send(JSON.stringify(stocks));
	// })
	// .catch((err) => {
	// 	console.log('an error has occurred')
	// 	res.send('error has occurred')
	// })
};

exports.save_new_stock = function(req, res) {
	console.log('save_new_stock');
	var newStock = new Stock();

	newStock.symbol = req.body.symbol.toUpperCase();

	console.log(newStock);

	newStock.save()
	.then((stock) => {
		res.send(stock);
	})
	.catch((err) => {
		res.send('error saving stock');
	});

};


exports.delete_stock_by_id = function(req, res) {
	console.log('delete_stock_by_id');
	Stock.findOneAndRemove({
		_id: req.params.id
	})
	.exec()
	.then((stock) => {
		console.log(stock)
		res.send(stock);
		//res.status(204);
	})
	.catch((err) => {
		res.send('error deleting list');
	});

};