const express = require('express');
const router = express.Router();
const authentication = require('./auth');
const user = require('./user');
const usertheme = require('./usertheme');

router.use('/v1/auth', authentication);
router.use('/v1/user', user);
router.use('/v1/usertheme', usertheme);

module.exports = router;