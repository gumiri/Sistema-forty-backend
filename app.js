const express = require('express');
const app = express();


const testeController = require('./controller/testeController');
const copiarBdsController = require('./controller/copiarBdsController');

app.use("/teste", testeController);

app.use("/copiar", copiarBdsController);


module.exports = app;