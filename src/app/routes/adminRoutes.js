'use strict';

var mongoose = require('mongoose');
var adminHandler = require('../controllers/admin.controller.js');
var express = require('express');

var router = express.Router();

router.post('/', adminHandler.createAdmin);

module.exports = router;