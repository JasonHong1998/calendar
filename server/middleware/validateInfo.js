const validateInfo = (req, res, next) => {
  const { email, password } = req.body;

  // regex that validates that the email address
  function validEmail(userEmail) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  // check if they are missing credentials
  if (![email, password].every(Boolean)) {
    return res.status(401).json('Missing Credential(s)');
  }

  // check if the email is valid
  if (!validEmail(email)) {
    return res.status(401).json('That\'s not an email address');
  }

  next();
};

module.exports = validateInfo;
