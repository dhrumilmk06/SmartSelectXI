// auth.controller.js
const User = require('../models/User');

// Simple in-memory user database for simulation
const usersDatabase = [
  new User('demo@selectxi.com', 'password123', 'Demo User', 'Dream Team XI')
];

exports.register = async (req, res) => {
  try {
    const { email, password, name, teamName } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required.' });
    }

    const existingUser = usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const newUser = new User(email, password, name, teamName);
    usersDatabase.push(newUser);

    // Generate simulated token
    const mockToken = `mock-jwt-token-for-${email}`;

    return res.status(201).json({
      message: 'User registered successfully.',
      token: mockToken,
      user: {
        email: newUser.email,
        name: newUser.name,
        teamName: newUser.teamName
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate simulated token
    const mockToken = `mock-jwt-token-for-${email}`;

    return res.status(200).json({
      message: 'Authentication successful.',
      token: mockToken,
      user: {
        email: user.email,
        name: user.name,
        teamName: user.teamName
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
};
