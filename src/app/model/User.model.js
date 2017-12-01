var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	email: {type: String, required: true, unique: true},
	stocks: [{
			symbol: String,
			latestPrice: String
		}],
	isAdmin: Boolean,
	hash: String,
	token: String
});

userSchema.pre('save', function(callback){
	if(this.isModified('hash')){
		this.hash = bcrypt.hashSync(this.hash);
	}

	callback();
});

userSchema.methods.checkPassword = function(pw, next){
	bcrypt.compare(pw, this.hash, function(err, isMatch){
		if(err){
			return next(err);
		}

		next(null, isMatch);
	});
}

// add stock for user
userSchema.methods.addStock = function(stock){
	if(this.stocks.indexOf(stock) == -1){
		this.stocks.push(stock);
	}

	return this.stocks;
}

// delete stock from user
userSchema.methods.deleteStock = function(symbol){
	for(var i = 0; i < this.stocks.length; i++) {
	    if(this.stocks[i].symbol == symbol) {
	        this.stocks.splice(i, 1);
	        break;
	    }
	}

	return this.stocks;
}

module.exports = mongoose.model('User', userSchema);