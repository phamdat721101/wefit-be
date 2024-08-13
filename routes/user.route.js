const express = require('express');
const router =express.Router();
const userCtrl = require('../controllers/user.controller');

router.route("/register").post(userCtrl.register)

module.exports = router