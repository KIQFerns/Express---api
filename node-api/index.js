const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const clientRoutes = require("./routes/routes")

const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//request padrão de informações básicas
app.get('/', (request, response) => {
  response.json({ titulo: 'Teste de Programação Desenvolvedor Facilita Jurídico' })
})

//rotas
app.use("/clientes", clientRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})