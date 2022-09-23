const fs = require('fs');
const ipsServer = require('../config/serversConf');

function copiarBds(callback){
    fs.copyFile('\\' + ipsServer.fortyflex + '\d\PASTAS_PUBLICAS_SERVER\GUSTAVO\"cipavinil pisicna.jpg"', '../', (err) =>{
        if(err){
            callback(err,[]);
        }
        else{
            callback(undefined,{message: "Banco de dados Fortyflex Copiado"})
        }
    });
}
module.exports = copiarBds;