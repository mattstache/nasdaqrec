'use strict';

var mongoose = require('mongoose')
const jwt = require('jwt-simple');
const config = require('../model/config');
const Request = require('request')
  //models
//const Stock = require('../model/Stock.model');
const User = require('../model/User.model');

exports.show_all_stocks = function(req, res) {
	const { token } = req.cookies;
	var decoded = jwt.decode(token, process.env.APP_SECRET);

	User.findOne({_id: decoded.id}, (err, user) => {

		var stockString = user.stocks.map(stock => stock.symbol).join();

		if(user.stocks.length > 0){
			Request.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + stockString + '&types=quote,news&range=1m&last=5', function (error, response, body) {
	            if (error) {
	            	console.log('--request err: ' + error)
	                throw error;
	            }

	            const data = JSON.parse(body);

	            user.stocks.forEach(function(stock){
	            	var symbol = stock.symbol;
	            	stock.latestPrice = data[symbol].quote.latestPrice;
	            });

	            user.save()
	            .then((user) => {
					console.log('save new stock :')
					console.log(user.stocks)
					res.send(JSON.stringify(user.stocks));
				})
				.catch((err) => {
					res.send('error saving stock');
				});
	        });
		}else{
			res.send(JSON.stringify({}));
		}
	})
};

exports.save_new_stock = function(req, res) {
	const { token } = req.cookies;
	var decoded = jwt.decode(token, process.env.APP_SECRET);

	var symbol = req.body.symbol.toUpperCase();

	Request.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + symbol + '&types=quote,news&range=1m&last=5', function (error, response, body) {
        if (error) {
        	console.log('--request err: ' + error)
            throw error;
        }

       const data = JSON.parse(body);
        var stockData = data[symbol];
        var latestPrice = stockData.quote.latestPrice;

        console.log('latestPrice:')
        console.log(latestPrice)


        User.findOne({_id: decoded.id}, (err, user) => {
			if (err) return next(err);
	        if (!user) return res.status(400).send('No user with that email');

	        user.addStock({symbol: symbol, latestPrice: latestPrice});

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
    });
};


exports.delete_stock_by_id = function(req, res) {
	const { token } = req.cookies;
	var decoded = jwt.decode(token, process.env.APP_SECRET);
	var symbol = req.body.stock.symbol.toUpperCase();

	User.findOne({_id: decoded.id}, (err, user) => {
		if (err){console.log(err); return next(err);}
        if (!user) return res.status(400).send('No user with that email');

        user.deleteStock(symbol);

	    user.save()
		.then((user) => {
			res.send(user.stocks);
		})
		.catch((err) => {
			res.send('error saving stock');
		});
	});
};
