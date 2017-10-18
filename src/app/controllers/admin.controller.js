const User = require('../model/User.model');
const bcrypt = require('bcrypt-nodejs');

exports.createAdmin = (req, res, next) => {
    if (typeof req.body.email !== 'string')
        return res.status(400).send('Missing email');
    if (typeof req.body.password !== 'string' && typeof req.body.hash !== 'string')
        return res.status(400).send('Missing password');


    var userData = {companyName: req.body.companyName};

    
    // validate email
    // http://emailregex.com
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
        return res.status(400).send('Invalid email');
    else
        userData.email = req.body.email;

    if (req.body.isAdmin)
        userData.isAdmin = !!req.body.isAdmin;
    if (req.body.password)
        userData.hash = req.body.password;
    if (req.body.hash)
        userData.hash = req.body.hash;

    // hash pw, since mongoose findOneAndUpdate bypasses hooks
    // https://github.com/Automattic/mongoose/issues/964
    userData.hash = bcrypt.hashSync(userData.hash);

    var userQuery = {email: userData.email};

    User.findOneAndUpdate(userQuery, userData, {upsert:true}, (err, user) => {
        if (err) {
            if (err.code === 11000)
                return res.status(400).send('Email or phone number already registered');    
            return next(err);
        }
        return res.sendStatus(200);
    });
};