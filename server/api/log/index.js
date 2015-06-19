'use strict';

var express = require('express');
var controller = require('./log.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.all('/', controller.create);
router.get('/all', controller.index);
router.delete('/all', auth.hasRole('admin'), controller.destroyAll);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
