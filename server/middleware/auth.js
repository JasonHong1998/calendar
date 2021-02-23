require('custom-env').env();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const pool = require('../../database/index.js');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (user.rows.length !== 0) {
          return done(null, false, { message: 'The email address is already in use by another account' });
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, bcryptPassword]);

        return done(null, newUser.rows[0].id);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);

        if (user.rows.length === 0) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user.rows[0].id);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: (req) => req.cookies.token,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(opts, (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      done(null, false, { message: 'JWT expired' });
    }
    done(null, jwtPayload);
  }),
);
