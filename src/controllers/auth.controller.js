const User = require('../models/User.model');
const { generateToken } = require('../services/token.service');
const generateUsername = require('../utils/username');

/* ADMIN REGISTER */
exports.registerAdmin = async (req, res) => {
  const { name, email, password, adminSecret } = req.body;

  // Simple security check (use env var in production)
  const SECRET_KEY = process.env.ADMIN_SECRET || 'secure-admin-key';
  if (adminSecret !== SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Invalid admin secret'
    });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const admin = await User.create({
    name,
    email,
    username: generateUsername(name),
    password,
    role: 'ADMIN'
  });

  res.status(201).json({
    success: true,
    token: generateToken(admin._id, admin.role),
    message: 'Admin registered successfully'
  });
};

/* ADMIN LOGIN */
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: 'ADMIN' });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid admin credentials'
    });
  }

  res.json({
    success: true,
    token: generateToken(admin._id, admin.role)
  });
};

/* ADMIN CREATES CANDIDATE */
exports.createCandidateByAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: 'Candidate already exists' });
  }

  const candidate = await User.create({
    name,
    email,
    username: generateUsername(name),
    password,
    role: 'CANDIDATE'
  });

  res.status(201).json({
    success: true,
    message: 'Candidate created'
  });
};

/* CANDIDATE LOGIN */
exports.candidateLogin = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email, role: 'CANDIDATE' });
  if (!candidate || !(await candidate.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid candidate credentials'
    });
  }

  res.json({
    success: true,
    token: generateToken(candidate._id, candidate.role)
  });
};
