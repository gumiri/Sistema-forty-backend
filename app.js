const express = require('express');
const app = express();


const copiarBdsController = require('./controller/copiarBdsController');


app.use("/copiar", copiarBdsController);



module.exports = app;