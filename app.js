const express = require('express');
const app = express();


const testeController = require('./controller/cliRecebAbertoController');
const copiarBdsController = require('./controller/copiarBdsController');
const gCliente = require('./controller/gClientesController');

app.use("/teste", testeController);

app.use("/copiar", copiarBdsController);

app.use('/cliente', gCliente);


module.exports = app;