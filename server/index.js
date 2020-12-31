const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const pool = require('../database/index.js');

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

// wrapper function for all of our route handlers
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

app.get('/', asyncMiddleware(async (req, res, next) => {
  const { search } = req.query;
  const text = 'SELECT item FROM searches WHERE lower(item) LIKE lower($1) LIMIT 12';
  const values = [`${search}%`];
  const newSearch = await pool.query(text, values);
  res.json(newSearch.rows);
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
