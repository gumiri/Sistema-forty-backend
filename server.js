const http = require('http');
const app = require('./app');
const copiar = require('./model/copiarBdsModel');
const port = 3000;
const server = http.createServer(app);
server.listen(port);
var time = 360 * 60 * 10000;

copiarBd()


async function copiarBd() {
    try {
        await copiar.copiarBds();
        server.closeAllConnections;
        server.close();
        copiar.renameFileAlphaflex();
        copiar.renameFileBrysaflex();
        copiar.renameFileFortyflex();
        copiar.renameFileFortyvinil();
        copiar.renameFileMangmaster();
        time = 360 * 60 * 10000;
    }
    catch (e) {
        console.log(e);
        console.log('Tentando novamente daqui 30 minutos');
        time = 30 * 60 * 10000;
    }
    server.listen(port);
}

setInterval(async function () { await copiarBd() }, time);