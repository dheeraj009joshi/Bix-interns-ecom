const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getCurrentUser} = require('../Controllers/userControllers');

const protect = require('../middleware/auth');

// Route to get all users and create a new user
app.route('/')
      .get(protect, getAllUsers)
      .post(protect, createUser);

// Route to get, update, and delete a user by ID
app.route('/:id')
      .get(protect, getUserById)
      .put(protect, updateUser)
      .delete(protect, deleteUser);

module.exports = router;

