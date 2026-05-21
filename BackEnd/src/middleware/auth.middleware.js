// auth.middleware.js

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No authorization header provided.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Invalid token format.' });
  }

  // TODO: Add proper JWT verification logic
  // For mock purpose, verify if it equals or contains 'mock'
  if (token === 'mock-jwt-token-value') {
    req.user = { id: 'mock-user-123', email: 'user@example.com' };
    return next();
  }

  // If token is present, we pass for mock ease
  req.user = { id: 'mock-user-123', email: 'user@example.com' };
  next();
};
