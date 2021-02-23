require('custom-env').env();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();
const asyncMiddleware = require('../middleware/asyncMiddleware.js');

router
  .route('/signup')
  .post((req, res) => {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user,
        });
      }

      /** This is what ends up in our JWT */
      const payload = {
        user,
        expires: Date.now() + process.env.JWT_EXPIRATION,
      };

      /** assigns payload to req.user */
      req.login(payload, { session: false }, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        /** generate a signed json web token and return it in the response */
        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_EXPIRATION);

        /** assign our jwt to the cookie */
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ user });
      });
    })(req, res);
  });

router
  .route('/signin')
  .post((req, res) => {
    passport.authenticate('signin', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user,
        });
      }

      const payload = {
        user,
        expires: Date.now() + process.env.JWT_EXPIRATION,
      };

      req.login(payload, { session: false }, (error) => {
        if (error) {
          res.status(400).send({ error });
        }

        const token = jwt.sign(JSON.stringify(payload), process.env.JWT_EXPIRATION);

        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ user });
      });
    })(req, res);
  });

router
  .route('/signout')
  .get(asyncMiddleware(async (req, res) => {
    res.clearCookie('token', { httpOnly: true }).sendStatus(200);
  }));

module.exports = router;
