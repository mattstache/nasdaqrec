const User = require('../model/User.model');
const jwt = require('jwt-simple');
const config = require('../model/config');

exports.loginUser = function(req, res, next){
	if(typeof req.body.email !== 'string'){
		return res.status(400).send('Missing email');
	}

	if(typeof req.body.password !== 'string'){
		return res.status(400).send('Missing password');
	}

	// User.findOne({email: req.body.email}, function(err, user){
	// 	if(err) return next(err);
	// 	if (!user) return res.status(401).send('no user with that email');

	// 	// if (!user.checkPassword(req.body.password)){
	// 	// 	return res.status(401).send('Error logging in');
	// 	// };

	// 	console.log('req.body.password: ' + req.body.password)

	// 	user.checkPassword(req.body.password, function(err, isMatch) {
	// 		if (err) return next(err);
	// 		if (!isMatch) return res.status(401).send('wrong pw');
	// 	});

	// 	//set json web token
	// 	var payload = {
	// 		id: user._id,
	// 		email: user.email
	// 	};
	// 	var token = jwt.encode(payload, config.secret);

	// 	user.token = token;
	// 	user.save(function(err){
	// 		if (err) return next(err);
	// 		return res.json({token: token});
	// 	});
	// });


	User.findOne({email: req.body.email}, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).send('No user with that email');

        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) return next(err);
            if (!isMatch) return res.status(401).send('Incorrect password');

            var payload = { id: user._id };
            //jwt_parameters.forEach((s) => payload[s] = user[s]);

            var token = jwt.encode(payload, config.secret);
            user.token = token;
            user.save((err) => {
                if (err) return next(err);
                res.json({token});
            });
        });
    });
};

exports.adminRequired = function(req, res, next){

};