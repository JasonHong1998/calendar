const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const bcrypt = require('bcrypt');
const pool = require('../database/index.js');
const jwtGenerator = require('./jwtGenerator.js');
const validateInfo = require('./middleware/validateInfo.js');
const authorize = require('./middleware/authorize.js');
const asyncMiddleware = require('./middleware/asyncMiddleware.js');

const app = express();
const port = 3000;

// read the bodies of the incoming JSON object
app.use(express.json());
app.use(express.urlencoded());

// log HTTP requests and errors
app.use(morgan('dev'));

// bypass the same-origin policy
app.use(cors());

// decrease the size of the response body and hence increase the speed of a web app
app.use(compression());

// serve up static files in dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(['/auth/register', '/auth/login'], validateInfo);
app.use('/auth/verify', authorize);

app.post('/auth/register', asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

  if (user.rows.length !== 0) {
    return res.status(401).json('You seem to have forgotten that you made an account');
  }

  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);
  const newUser = await pool.query('INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *', [email, bcryptPassword]);
  const token = jwtGenerator(newUser.rows[0].user_id);

  return res.json({ token });
}));

app.post('/auth/login', asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

  if (user.rows.length === 0) {
    return res.status(401).json('Incorrect email or password');
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

  if (!validPassword) {
    return res.status(401).json('Incorrect email or password');
  }
  const token = jwtGenerator(user.rows[0].user_id);
  return res.json({ token });
}));

app.get('/auth/verify', asyncMiddleware(async (req, res, next) => {
  res.status(200).json(true);
}));

// Invalid endpoint error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Custom error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(port);
