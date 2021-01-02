const jwt = require('jsonwebtoken');
require('dotenv').config();

// this middleware will on continue on if the token is inside the local storage
const authorize = (req, res, next) => {
  // Get token from header
  const token = req.header('token');

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: 'Authorization denied' });
  }

  // Check if the token is valid. It is going to give use the user id (user:{id: user.id})
  const verify = jwt.verify(token, process.env.jwtSecret);

  req.user = verify.user;
  next();
};

module.exports = authorize;
