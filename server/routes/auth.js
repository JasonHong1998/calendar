const bcrypt = require('bcrypt');
const router = require('express').Router();
const validator = require('validator');
const asyncMiddleware = require('../middleware/asyncMiddleware.js');
const jwtGenerator = require('../jwtGenerator.js');
const pool = require('../../database/index.js');

router
  .route('/signup')
  .post(asyncMiddleware(async (req, res, next) => {
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
    const newUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, bcryptPassword]);
    const token = jwtGenerator(newUser.rows[0].id);

    return res.cookie('token', token, { httpOnly: true }).sendStatus(200);
  }));

router
  .route('/signin')
  .post(asyncMiddleware(async (req, res, next) => {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(401).json('Incorrect email or password');
    }

    const user = await pool.query('SELECT id, password FROM users WHERE email = $1', [email]);

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

router
  .route('/verify')
  .get(asyncMiddleware(async (req, res, next) => {
    res.sendStatus(200);
  }));

router
  .route('/signout')
  .get(asyncMiddleware(async (req, res, next) => {
    res.cookie('token', { httpOnly: true }).sendStatus(200);
  }));

module.exports = router;
