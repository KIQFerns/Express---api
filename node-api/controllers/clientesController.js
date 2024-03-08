const pool = require("../database/db")
const findShortestRoute = require("../services/shortesRouteService")

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
  const { nome, email, telefone, x, y } = request.body

  pool.query('INSERT INTO clientes (nome, email, telefone, x, y) VALUES ($1, $2, $3, $4, $5) RETURNING id_cliente', [nome, email, telefone, x, y], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Cliente added with ID: ${results.rows[0].id_cliente}`)
  })
}

const updateCliente = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, email, telefone, x, y } = request.body

  pool.query(
    'UPDATE clientes SET nome = $1, email = $2, telefone = $3, x = $4, y = $5 WHERE id_cliente = $6',
    [nome, email, telefone, x, y, id],
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

const shortRoute  = (request, response) => {
  pool.query('SELECT * FROM clientes ORDER BY id_cliente ASC', (error, results) => {
    if (error) {
      throw error
    }
    // fazer contas aqui 
    let clientes = results.rows;
    const { route, distance, order } = findShortestRoute(clientes);
    response.status(200).json(order);


    response.status(200).json(ordem)
  })
}

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  shortRoute
}