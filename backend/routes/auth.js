const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken, generateToken } = require('../middleware/auth');

// POST /api/auth/register - User registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.username === username 
                    ? 'Username already exists' 
                    : 'Email already exists'
            });
        }

        // Create new user
        const user = new User({
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password
        });

        const savedUser = await user.save();
        const token = generateToken(savedUser._id, savedUser.username);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: savedUser,
                token
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                error: error.message
            });
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
});

// POST /api/auth/login - User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Find user by username or email
        const user = await User.findOne({
            $or: [
                { username: username.trim() },
                { email: username.trim().toLowerCase() }
            ]
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate token
        const token = generateToken(user._id, user.username);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user,
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during login',
            error: error.message
        });
    }
});

// GET /api/auth/profile - Get user profile (protected)
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: req.user
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

module.exports = router;
