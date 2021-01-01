const { Pool } = require('pg');
const config = require('./config.json');

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.db,
  password: config.pw,
  port: config.port,
});

module.exports = pool;
