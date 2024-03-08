const Pool = require('pg').Pool

const pool = new Pool({
  user: 'kiq',
  host: 'localhost',
  database: 'desafio',
  password: 'Cas2cafor@',
  port: 5432,
})

module.exports = pool;