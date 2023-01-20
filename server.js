const http = require('http');
const app = require('./app');
const copiar = require('./model/copiarBdsModel');
const port = 3000;
const server = http.createServer(app);
server.listen(port);

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
    }
    catch (e) {
        console.log(e);
        console.log('Tentando novamente daqui 1 hora');
    }
    server.listen(port);
}

setInterval(async function () { await copiarBd() }, 1800000);