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

// TODO method to check hashed pw
userSchema.methods.checkPassword = function(pw, next){
	console.log('checkPassword: ' + pw)
	bcrypt.compare(pw, this.hash, function(err, isMatch){
		if(err){
			console.log('error')
			console.log(err)
			return next(err);
		}else{
			console.log('no err')
		}

		next(null, isMatch);
	});
	//return (this.hash === pw);
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