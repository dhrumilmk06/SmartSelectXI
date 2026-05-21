// auth.controller.js

exports.register = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // TODO: Add database lookup and save logic, hash password
  
  return res.status(201).json({
    message: 'User registered successfully (Mock API).',
    user: {
      email,
      createdAt: new Date().toISOString()
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // TODO: Add database lookup, password verification, generate JWT
  
  return res.status(200).json({
    message: 'Login successful (Mock API).',
    token: 'mock-jwt-token-value',
    user: {
      email
    }
  });
};
