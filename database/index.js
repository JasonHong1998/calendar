const { Pool } = require('pg');
const config = require('./config.json');

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.db,
  password: config.pw,
  port: parseInt(config.port, 10),
});

module.exports = pool;
