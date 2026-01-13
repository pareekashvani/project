const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');
const rateLimit = require('express-rate-limit');

// Rate limiting (STABLE)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later'
    }
});

// Apply limiter
router.use(limiter);

// Register
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ],
    register
);

// Login
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    login
);

module.exports = router;
