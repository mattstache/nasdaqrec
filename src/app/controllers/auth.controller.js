const User = require('../model/User.model');
const jwt = require('jwt-simple');
const config = require('../model/config');

exports.loginUser = function(req, res, next){
	console.log('controller loginuser')
	if(typeof req.body.email !== 'string'){
		return res.status(400).send('Missing email');
	}

	if(typeof req.body.password !== 'string'){
		return res.status(400).send('Missing password');
	}

	console.log('controller loginuser 2: ' + req.body.email)


	User.findOne({email: req.body.email}, (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).send('No user with that email');

        user.checkPassword(req.body.password, (err, isMatch) => {
            
            if (err){
            	console.log('err')
            	console.log(err)
            	return next(err);
            }
            if (!isMatch) return res.status(401).send('Incorrect password');

            var payload = { id: user._id };
            //jwt_parameters.forEach((s) => payload[s] = user[s]);

            var token = jwt.encode(payload, config.secret);
            user.token = token;
            user.save((err) => {
                if (err) return next(err);
                res.json({user: user, token: token});
            });
        });
    });
};

exports.loginRequired = function(req, res, next){
	validateToken(req, res, next, { adminRequired: false });
};

function validateToken(req, res, next, c) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) return res.status(403).send('This endpoint requires a token');

    try {
        var decoded = jwt.decode(token, config.secret);
    } catch(err) {
        return res.status(403).send('Failed to authenticate token');
    }

    User.findById(decoded.id, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(403).send('Invalid user');
        if (token !== user.token)
            return res.status(403).send('Expired token');
        if (decoded.isAdmin !== user.isAdmin)
            return res.status(403).send('Expired token');

        if (!user.isAdmin && c.adminRequired)
            return res.status(403).send('Admin privileges required');


        req.user = decoded;
        req.token = token;
        next();
    });
}