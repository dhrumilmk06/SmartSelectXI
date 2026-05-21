// auth.middleware.js
// Standard Express middleware to verify authentication token

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Token error. Format should be: Bearer [token]' });
  }

  const token = parts[1];

  if (!token || token === 'undefined' || token === 'null') {
    return res.status(401).json({ error: 'Invalid authentication token.' });
  }

  // Simulated decoded token user assignment
  req.user = {
    email: 'user@example.com',
    name: 'SelectXI User',
    role: 'player'
  };

  next();
};
