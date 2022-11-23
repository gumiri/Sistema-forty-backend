const http = require('http');
const app = require('./app');
const copiar = require('./model/copiarBdsModel');
const port = 3000;
const server = http.createServer(app);
server.listen(port);

setInterval(copiar, 3600000);