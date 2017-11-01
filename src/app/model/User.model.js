var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	email: {type: String, required: true, unique: true},
	stocks: [String],
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
userSchema.methods.addStock = function(symbol){
	if(this.stocks.indexOf(symbol) == -1){
		this.stocks.push(symbol);
	}

	return this.stocks;
}

// delete stock from user
userSchema.methods.deleteStock = function(symbol){
	var index = this.stocks.indexOf(symbol);

	if(index !== -1){
		this.stocks.splice(index, 1);
	}

	return this.stocks;
}

module.exports = mongoose.model('User', userSchema);