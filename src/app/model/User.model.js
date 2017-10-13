var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: {type: String, required: true, unique: true},
	stocks: [String],
	isAdmin: Boolean,
	hash: String
});

userSchema.pre('save', function(callback){
	if(this.isAdmin){
		if(!this.hash && !this.password){
			throw new Error('No hash');
		}

		this.hash = this.hash || this.password;

		// TODO has the pw
	}else{

	}
	callback();
});

// TODO method to check hashed pw
userSchema.methods.checkPassword = function(pw){
	return (this.hash === pw);
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