const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ titulo: 'Teste de Programação Desenvolvedor Facilita Jurídico' })
})

app.get('/clientes', db.getClientes)
app.get('/clientes/:id', db.getClienteById)
app.post('/clientes', db.createCliente)
app.put('/clientes/:id', db.updateCliente)
app.delete('/clientes/:id', db.deleteCliente)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})