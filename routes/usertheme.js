const express = require('express');
const router = express.Router();
const userthemeController = require('../controllers/usertheme');
const usercheckAuth = require('../middleware/auth');

router.post('/create', usercheckAuth, userthemeController.createUsertheme);
router.get('/get-usertheme', usercheckAuth, userthemeController.getUsertheme);
router.put('/update', usercheckAuth, userthemeController.updatetheme);




module.exports = router;