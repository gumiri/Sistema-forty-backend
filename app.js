const express = require('express');
const app = express();

const testeController = require('./controller/testeController');

app.use("/teste", testeController);





module.exports = app;