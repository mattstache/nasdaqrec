var mongoose = require('mongoose');
const User = require('../src/app/model/User.model');
const config = require('../src/app/model/config');

var disconnect = false;

console.log('mongoose.readyState: ' + mongoose.connection.readyState)

//open mongoose connection if it doesnt already exist
if (mongoose.connection.readyState === 0){
	console.log('opening mongoose connection...');
	mongoose.connect(config.dbUrl, {
  		useMongoClient: true,
	});

	//close conneciton if running as standalone script
	disconnect = true;
}

User.find({email: config.adminEmail}, function(err, admin){
	if (err){
		if(disconnect) mongoose.connection.close();
		return console.log(err);
	}

	if(admin.length){
		if(disconnect) mongoose.connection.close();
		return;
	}

	console.log('could not find user ' + config.adminEmail);
	var newAdmin = new User({
		email: config.adminEmail,
		hash: config.adminPassword,
		isAdmin: true
	})

	newAdmin.save(function(err, user){
		if(err) {
			if(disconnect) mongoose.connection.close();
			return console.log(err);
		}

		console.log('created user ' + config.adminEmail);
		if(disconnect) mongoose.connection.close();
		return;
	});
})



