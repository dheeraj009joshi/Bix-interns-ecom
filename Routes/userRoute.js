const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser,  deleteUser } = require('../Controllers/userControllers');  // Make sure all necessary functions are imported

const protect = require('../Middlewares/auth');

// Route to get all users and create a new user
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me',  getCurrentUser);


module.exports = router;

