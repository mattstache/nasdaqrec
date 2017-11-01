'use strict';

var mongoose = require('mongoose')
const jwt = require('jwt-simple');
const config = require('../model/config');
  //models
//const Stock = require('../model/Stock.model');
const User = require('../model/User.model');

exports.show_all_stocks = function(req, res) {
	const { token } = req.cookies;
	var decoded = jwt.decode(token, config.secret);

	User.findOne({_id: decoded.id}).lean()
	.exec()
	.then((user) => {
		res.send(JSON.stringify(user.stocks));
	})
	.catch((err) => {
		res.send('error has occurred')
	})
};

exports.save_new_stock = function(req, res) {
	const { token } = req.cookies;
	var decoded = jwt.decode(token, config.secret);

	var stock = req.body.symbol.toUpperCase();

	User.findOne({_id: decoded.id}, (err, user) => {
		if (err) return next(err);
        if (!user) return res.status(400).send('No user with that email');

        user.addStock(stock);

	    user.save()
		.then((user) => {
			console.log('save new stock :')
			console.log(user.stocks)
			res.send(user.stocks);
		})
		.catch((err) => {
			res.send('error saving stock');
		});
	});
};


exports.delete_stock_by_id = function(req, res) {
	const { token } = req.cookies;
	var decoded = jwt.decode(token, config.secret);
	var stock = req.body.stock.toUpperCase();

	User.findOne({_id: decoded.id}, (err, user) => {
		if (err){console.log(err); return next(err);}
        if (!user) return res.status(400).send('No user with that email');

        user.deleteStock(stock);

	    user.save()
		.then((user) => {
			res.send(user.stocks);
		})
		.catch((err) => {
			res.send('error saving stock');
		});
	});
};
