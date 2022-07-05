const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const usercheckAuth = require('../middleware/auth');

router.get('/get-user', usercheckAuth, userController.getUser)




module.exports = router;