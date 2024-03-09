const env = require("dotenv").config();
const Pool = require('pg').Pool

const pool = new Pool({
  user: env.parsed.DATABASE_USER,
  host: env.parsed.DATABASE_HOST,
  database: env.parsed.DATABASE_DB,
  password: env.parsed.DATABASE_PASSWORD,
  port: env.parsed.DATABASE_PORT,
})

module.exports = pool;