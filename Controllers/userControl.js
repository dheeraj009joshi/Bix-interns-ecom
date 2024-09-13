const User = require('../Models/user');  // Import the User model
const jwt = require('jsonwebtoken');  // For token generation

// Register a new user
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create a new user
    const user = await User.create({ username, email, password });

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ success: true, data: { token } });  // Send token in response
  } catch (error) {
    console.log(error);  // Log error
    next(error);  // Forward error to error handler
  }
};

// Login a user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password is correct
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ success: true, data: { token } });
  } catch (error) {
    console.log(error);  // Log error
    next(error);  // Forward error to error handler
  }
};

// Get current user (only for authenticated users)
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('createdOrders', 'orderNumber totalAmount');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);  // Log error
    next(error);  // Forward error to error handler
  }
};
