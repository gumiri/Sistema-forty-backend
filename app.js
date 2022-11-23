const express = require('express');
const app = express();
const cors = require('cors');


const copiarBdsController = require('./controller/copiarBdsController');
const getCtrecController = require('./controller/getCtrecController');

app.use(cors());

app.use("/copiar", copiarBdsController);

app.use("/getctrec", getCtrecController);



module.exports = app;