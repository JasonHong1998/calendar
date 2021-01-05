const jwt = require('jsonwebtoken');
require('dotenv').config();

// Continue if the token is inside local storage
const authorize = (req, res, next) => {
  // Get token from header
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: 'Authorization denied' });
  }

  // Check if the token is valid. It is going to give the user id ( { user: user.id} )
  const verify = jwt.verify(token, process.env.jwtSecret);

  req.user = verify.user;
  next();
};

module.exports = authorize;
