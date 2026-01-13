const User = require('../models/User.model');
const { generateToken } = require('../services/token.service');
const { validationResult } = require('express-validator');
const generateUsername = require('../utils/username');

// REGISTER
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: errors.array()
        });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }

    const username = generateUsername(name);

    const user = await User.create({
        name,
        email,
        username,
        password,
        role: 'CANDIDATE'
    });

    return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        }
    });
};

// LOGIN
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        }
    });
};
