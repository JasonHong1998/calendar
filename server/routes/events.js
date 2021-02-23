const router = require('express').Router();
const asyncMiddleware = require('../middleware/asyncMiddleware.js');
const pool = require('../../database/index.js');

router
  .route('/')
  .get(asyncMiddleware(async (req, res, next) => {
    const { user } = req.cookies;
    const events = await pool.query('SELECT * FROM events WHERE user_id = $1', [user]);
    res.status(200).json(events.rows);
  }))
  .post(asyncMiddleware(async (req, res, next) => {
    const {
      user, name, calendar, color, startTime, endTime,
    } = req.body;
    const events = await pool.query('INSERT INTO events (user_id, name, calendar, color, start_time, end_time) VALUES ($1, $2, $3, $4, $5, $6)', [user, name, calendar, color, startTime, endTime]);
    res.status(200).json(events.rows);
  }));

router
  .route('/:id')
  .put(asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const {
      user, name, calendar, color, startTime, endTime,
    } = req.body;
    const events = await pool.query('UPDATE events SET user_id = $1, name = $2, calendar = $3, color = $4, tag_id = $5, start_time = $4, end_time = $5 WHERE id = $6 AND user_id = $7', [user, name, calendar, color, startTime, endTime, id, user]);
    res.status(200).json(events.rows);
  }))
  .delete(asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req.body;
    const events = await pool.query('DELETE FROM events WHERE id = $1 and user_id = $2', [id, user]);
    res.status(200).json(events.rows);
  }));

module.exports = router;
