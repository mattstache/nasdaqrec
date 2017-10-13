'use strict';

var mongoose = require('mongoose')
  //models
const Stock = require('../model/Stock.model');

exports.show_all_stocks = function(req, res) {
	console.log('show_all_stocks');
	Stock.find().lean()
	.exec()
	.then((stocks) => {
		res.send(JSON.stringify(stocks));
	})
	.catch((err) => {
		console.log('an error has occurred')
		res.send('error has occurred')
	})
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