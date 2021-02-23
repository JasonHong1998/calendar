require('custom-env').env();
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const Redis = require('ioredis');

// routes
const accountRoute = require('./routes/account.js');
const eventsRoute = require('./routes/events.js');
const todoRoute = require('./routes/todo.js');
require('./middleware/auth.js');

// https credentials
const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const app = express();
const port = process.env.HTTPS_PORT || 3443;

const client = new Redis();
const store = new RedisStore({ client });

app.use(
  session({
    store,
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'quiet, pal! it\'s a secret!',
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);

// read the bodies of the incoming JSON object
app.use(express.json());
app.use(express.urlencoded());

// parse cookies passed by the browser
app.use(cookieParser());

// decrease the size of the response body and hence increase the speed of a web app
app.use(compression());

// bypass the same-origin policy
app.use(cors());

// set security-related HTTP response headers
app.use(helmet());

// log HTTP requests and errors
app.use(morgan('dev'));

// serve up static files in dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/auth', accountRoute);
app.use('/api/todos', passport.authenticate('jwt', { session: false }), eventsRoute);
app.use('/api/events', passport.authenticate('jwt', { session: false }), todoRoute);

// Invalid endpoint error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Custom error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

https.createServer(credentials, app).listen(port);
