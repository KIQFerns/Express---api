const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kiq',
  host: 'localhost',
  database: 'desafio',
  password: 'Cas2cafor@',
  port: 5432,
})

const getClientes = (request, response) => {
  pool.query('SELECT * FROM clientes ORDER BY id_cliente ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getClienteById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM clientes WHERE id_cliente = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCliente = (request, response) => {
  const { nome, email, telefone } = request.body

  pool.query('INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING id_cliente', [nome, email, telefone], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Cliente added with ID: ${results.rows[0].id_cliente}`)
  })
}

const updateCliente = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, email, telefone } = request.body

  pool.query(
    'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id_cliente = $4',
    [nome, email, telefone, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Cliente modified with ID: ${id}`)
    }
  )
}

const deleteCliente = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM clientes WHERE id_cliente = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Cliente deleted with ID: ${id}`)
  })
}

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
}