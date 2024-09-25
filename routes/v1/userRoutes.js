const express = require('express');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  updateAddress,
  updateLanguage,
} = require('../../controllers/userController');
const { protect } = require('../../middlewares/authMiddleware');

const router = express.Router();

// User registration and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Get current logged-in user details
router.get('/me', protect, getCurrentUser);

// Update profile (name, email, language, address)
router.put('/updateProfile', protect, updateProfile);

// Update only the address
router.put('/updateAddress', protect, updateAddress);

// Update only the language preference
router.put('/updateLanguage', protect, updateLanguage);

module.exports = router;

