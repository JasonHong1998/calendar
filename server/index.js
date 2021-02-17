const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');
require('custom-env').env();
const authorize = require('./middleware/authorize.js');
const authRoute = require('./routes/auth.js');
const eventsRoute = require('./routes/events.js');
const todoRoute = require('./routes/todo.js');

const app = express();
const port = process.env.NODE_PORT;

// read the bodies of the incoming JSON object
app.use(express.json());
app.use(express.urlencoded());

// parse cookeis passed by the browser
app.use(cookieParser());

// decrease the size of the response body and hence increase the speed of a web app
app.use(compression());

// bypass the same-origin policy
app.use(cors());

// set security-related HTTP response headers
app.use(helmet());

// selects the last parameter value to prevent HTTP parameter pollution
app.use(hpp());

// log HTTP requests and errors
app.use(morgan('dev'));

// serve up static files in dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(['/api/auth/verify', /events/, /todos/], authorize);

app.use('/api/auth', authRoute);
app.use('/api/todos', eventsRoute);
app.use('/api/events', todoRoute);

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
