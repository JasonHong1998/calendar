const router = require('express').Router();
const asyncMiddleware = require('../middleware/asyncMiddleware.js');
const pool = require('../../database/index.js');

router
  .route('/')
  .get(asyncMiddleware(async (req, res, next) => {
    const { userEmail } = req.body;
    const events = await pool.query('SELECT * FROM events WHERE user_email = $1', [userEmail]);
    res.status(200).json(events.rows);
  }))
  .post(asyncMiddleware(async (req, res, next) => {
    const {
      userEmail, name, tagId, startTime, endTime,
    } = req.body;
    const events = await pool.query('INSERT INTO events (user_email, name, tag_id, start_time, end_time) VALUES ($1, $2, $3, $4, $5)', [userEmail, name, tagId, startTime, endTime]);
    res.status(200).json(events.rows);
  }))
  .put(asyncMiddleware(async (req, res, next) => {
    const {
      userEmail, name, tagId, startTime, endTime, id,
    } = req.body;
    const events = await pool.query('UPDATE events SET user_email = $1, name = $2, tag_id = $3, start_time = $4, end_time = $5 WHERE id = $6', [userEmail, name, tagId, startTime, endTime, id]);
    res.status(200).json(events.rows);
  }))
  .delete(asyncMiddleware(async (req, res, next) => {
    const { id } = req.body;
    const events = await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.status(200).json(events.rows);
  }));

module.exports = router;
