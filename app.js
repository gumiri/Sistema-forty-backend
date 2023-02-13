const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");

const copiarBdsController = require('./controller/copiarBdsController');
const getCtrecController = require('./controller/getCtrecController');
const getHistoricoClienteController = require('./controller/historicoClienteController');
const getClientes = require('./controller/todosClientesController');
const getEstoque = require('./controller/controleEstoqueController');
const getEstoqueConsolidado = require('./controller/estoqueConsolidadoController');
const getEstoquePorDataFortyflex = require('./controller/estoquePorDataFortyflexController')
const auth = require('./controller/authenticationController');

app.use(cors());

app.use(bodyParser.json());

app.use("/estoque-data-fortyflex", getEstoquePorDataFortyflex);

app.use("/estoque-total", getEstoqueConsolidado);

app.use("/estoque", getEstoque);

app.use("/copiar", copiarBdsController);

app.use("/getctrec", getCtrecController);

app.use("/historico", getHistoricoClienteController);

app.use("/clientes", getClientes);

app.use("/authentication", auth);

module.exports = app;