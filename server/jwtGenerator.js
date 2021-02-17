const jwt = require('jsonwebtoken');
require('custom-env').env();

const jwtGenerator = (id) => {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = jwtGenerator;
