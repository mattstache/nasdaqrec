var mongoose = require('mongoose');
const User = require('../src/app/model/User.model');
const config = require('../src/app/model/config');

var disconnect = false;

console.log('mongoose.readyState: ' + mongoose.connection.readyState)

//open mongoose connection if it doesnt already exist
if (mongoose.connection.readyState === 0){
	console.log('opening mongoose connection...');
	mongoose.connect(process.env.DB_URL, {
  		useMongoClient: true,
	});

	//close conneciton if running as standalone script
	disconnect = true;
}

User.find({email: process.env.ADMIN_EMAIL}, function(err, admin){ //config.adminEmail
	if (err){
		if(disconnect) mongoose.connection.close();
		return console.log(err);
	}

	if(admin.length){
		if(disconnect) mongoose.connection.close();
		return;
	}

	console.log('could not find user ' + process.env.ADMIN_EMAIL);
	var newAdmin = new User({
		email: process.env.ADMIN_EMAIL,
		hash: process.env.ADMIN_PASSWORD,
		isAdmin: true
	})

	newAdmin.save(function(err, user){
		if(err) {
			if(disconnect) mongoose.connection.close();
			return console.log(err);
		}

		console.log('created user ' + process.env.ADMIN_EMAIL);
		if(disconnect) mongoose.connection.close();
		return;
	});
})



