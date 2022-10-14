const express = require('express');
const app = express();


const copiarBdsController = require('./controller/copiarBdsController');
const unificarController = require('./controller/unificarController');
const criarHtdUnificado = require('./controller/criarHtdUnificadoController');


app.use("/copiar", copiarBdsController);

app.use("/cliente", unificarController);

app.use("/criar", criarHtdUnificado);


module.exports = app;