const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const bcrypt = require('bcrypt');
const helmet = require('helmet');
const hpp = require('hpp');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const pool = require('../database/index.js');
const jwtGenerator = require('./jwtGenerator.js');
const authorize = require('./middleware/authorize.js');
const asyncMiddleware = require('./middleware/asyncMiddleware.js');

const app = express();
const port = 3000;

// read the bodies of the incoming JSON object
app.use(express.json());
app.use(express.urlencoded());

// parse cookeis passed by the browser
app.use(cookieParser());

// log HTTP requests and errors
app.use(morgan('dev'));

// bypass the same-origin policy
app.use(cors());

// decrease the size of the response body and hence increase the speed of a web app
app.use(compression());

// serve up static files in dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// set security-related HTTP response headers
app.use(helmet());

// selects the last parameter value to prevent HTTP parameter pollution
app.use(hpp());

app.use(['/api/auth/verify', '/api/dashboard'], authorize);

app.post('/api/auth/register', asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(401).json('Incorrect email or password');
  }

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length !== 0) {
    return res.status(401).json('Incorrect email or password');
  }

  const salt = await bcrypt.genSalt(10);
  const bcryptPassword = await bcrypt.hash(password, salt);
  const newUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, bcryptPassword]);
  const token = jwtGenerator(newUser.rows[0].id);

  return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
}));

app.post('/api/auth/login', asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(401).json('Incorrect email or password');
  }

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (user.rows.length === 0) {
    return res.status(401).json('Incorrect email or password');
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!validPassword) {
    return res.status(401).json('Incorrect email or password');
  }
  const token = jwtGenerator(user.rows[0].id);
  return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
}));

app.get('/api/auth/verify', asyncMiddleware(async (req, res, next) => {
  res.sendStatus(200);
}));

app.get('/api/dashboard', asyncMiddleware(async (req, res, next) => {
  const user = await pool.query('SELECT email FROM users WHERE id = $1', [req.user]);
  res.json(user.rows[0]);
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
