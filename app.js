const express = require('express');
const app = express();


const copiarBdsController = require('./controller/copiarBdsController');
const unificarController = require('./controller/unificarController');
const criarHtdUnificado = require('./controller/criarHtdUnificadoController');
const getctrec = require('./controller/getCtrecController');


app.use("/copiar", copiarBdsController);

app.use("/cliente", unificarController);

app.use("/criar", criarHtdUnificado);

app.use("/ctrec", getctrec);


module.exports = app;