// auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register a new user profile
router.post('/register', authController.register);

// Login and retrieve analytics access token
router.post('/login', authController.login);

module.exports = router;
