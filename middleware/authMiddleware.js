const jwt = require('jsonwebtoken');

const protectRoute = (req, res, next) => {
  // 1. Get token from headers
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  // Fix: Split based on 'Bearer ' (with space)
  const token = authHeader.split(' ')[1];  // Get the token after 'Bearer'

  console.log('Token:', token);  // Debugging line to check if token is being received

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token verification
    console.log('Decoded:', decoded);  // Debugging line to check decoded data
    req.user = decoded; // Store user info from token
    next(); // Allow route access
  } catch (err) {
    console.log('Invalid Token:', err.message);  // Log error message for debugging
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = protectRoute;
