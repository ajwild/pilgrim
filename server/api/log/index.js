'use strict';

var express = require('express');
var controller = require('./log.controller');

var router = express.Router();

router.all('/', controller.create);
router.get('/all', controller.index);

module.exports = router;