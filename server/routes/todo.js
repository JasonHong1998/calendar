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

router
  .route('/:id')
  .put(asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const {
      userEmail, day, item, completion,
    } = req.body;
    const todos = await pool.query('UPDATE todos SET user_email = $1, day = $2, item = $3, completion = $4 WHERE id = $5 AND user_email = $6', [userEmail, day, item, completion, id, userEmail]);
    res.status(200).json(todos.rows);
  }))
  .delete(asyncMiddleware(async (req, res, next) => {
    const { id } = req.params;
    const { userEmail } = req.body;
    const todos = await pool.query('DELETE FROM todos WHERE id = $1 AND user_email = $2', [id, userEmail]);
    res.status(200).json(todos.rows);
  }));

module.exports = router;
