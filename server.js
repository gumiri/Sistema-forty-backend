const http = require('http');
const app = require('./app');
const copiar = require('./model/copiarBdsModel');
const port = 3000;
const server = http.createServer(app);
server.listen(port);

var timeToCopy = 10;


async function copiarBd(){
    var today = new Date();
    nowInHour = today.getHours();
    if (timeToCopy == nowInHour) {
        server.closeAllConnections;
        server.close();
        try {
            await copiar();
        }
        catch(e){
            console.log(e);
            console.log('Tentando novamente daqui 1 hora');
            timeToCopy += 1;
        }
        server.listen(port);
    }
}

setInterval(async function() {await copiarBd()}, 3600000);