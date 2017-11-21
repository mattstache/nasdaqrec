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

	User.findOne({email: req.body.email}, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).send('No user with that email');

        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err){
            	return next(err);
            }
            if (!isMatch) return res.status(401).send('Incorrect password');

            var payload = { id: user._id };

            var token = jwt.encode(payload, config.secret);
            user.token = token;
            user.save((err) => {
                if (err) return next(err);
                res.status(200)
	            .cookie('token', token, {httpOnly: false, maxAge: 999999999999})
	            .send({message: 'cookie is set'});
            });
        });
    });
};

exports.signOutUser = function(req, res, next){
	cookie = req.cookies;

    res.cookie('token', '', {expires: new Date(0)});
    res.status(200).send();
};

exports.loginRequiredBackend = function(req, res, next){
    const { token } = req.cookies;

    if (!token){
    	console.log('This endpoint requires a token')
    	return res.json({isAuthenticated: false}).send('This endpoint requires a token');
    }

    try {
        var decoded = jwt.decode(token, config.secret);
    } catch(err) {
    	console.log('Failed to authenticate token')
        return res.status(403).send('Failed to authenticate token');
    }

    User.findById(decoded.id, function(err, user) {
	if (err) return next(err);
	if (!user){
		console.log('Invalid user')
		return res.status(403).send('Invalid user');
	}
	if (token !== user.token){
		console.log('Expired token 1')
	    return res.status(403).send('Expired token');
	}
console.log('user has been authenticated');
	authenticated = true;
	//res.status(200).send({user: user, isAuthenticated:true});
        next();
    });
};

exports.loginRequired = function(req, res, next){
	validateToken(req, res, next, { adminRequired: false });
};

function validateToken(req, res, next, c) {
    const { token } = req.cookies;

    if (!token){
    	return res.json({isAuthenticated: false}).send('This endpoint requires a token');
    }

    try {
        var decoded = jwt.decode(token, config.secret);
    } catch(err) {
        return res.status(403).send('Failed to authenticate token');
    }

    User.findById(decoded.id, function(err, user) {
        if (err) return next(err);
        if (!user){
        	console.log('Invalid user')
        	return res.status(403).send('Invalid user');
        }
        if (token !== user.token){
        	console.log('Expired token 1')
            return res.status(403).send('Expired token');
        }

        authenticated = true;
        res.status(200).send({user: user, isAuthenticated:true});
        next();
    });
}