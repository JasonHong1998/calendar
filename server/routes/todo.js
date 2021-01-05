const router = require('express').Router();
const asyncMiddleware = require('../middleware/asyncMiddleware.js');
const pool = require('../../database/index.js');

router
  .route('/')
  .get(asyncMiddleware(async (req, res, next) => {
    const { userEmail } = req.body;
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
    res.status(200).json(todos.rows);
  }))
  .post(asyncMiddleware(async (req, res, next) => {
    const {
      userEmail, day, item, completion,
    } = req.body;
    const todos = await pool.query('INSERT INTO todos (user_email, day, item, completion) VALUES ($1, $2, $3, $4)', [userEmail, day, item, completion]);
    res.status(200).json(todos.rows);
  }))
  .put(asyncMiddleware(async (req, res, next) => {
    const {
      userEmail, day, item, completion, id,
    } = req.body;
    const todos = await pool.query('UPDATE todos SET user_email = $1, day = $2, item = $3, completion = $4 WHERE id = $5', [userEmail, day, item, completion, id]);
    res.status(200).json(todos.rows);
  }))
  .delete(asyncMiddleware(async (req, res, next) => {
    const { id } = req.body;
    const todos = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
    res.status(200).json(todos.rows);
  }));

module.exports = router;
