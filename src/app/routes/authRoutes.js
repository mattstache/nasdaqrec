'use strict';

var mongoose = require('mongoose');
var auth = require('../controllers/auth.controller.js');
var express = require('express');

var router = express.Router();


router.post('/token', auth.loginUser);

module.exports = router;