const express = require('express');

const userControl = require('../controllers/users.controller');

const router = express.Router();
//Signup route
router.post('/signup', userControl.registerUser);
//Login route
router.post('/login', userControl.loginUser);

module.exports = router;
