const fs = require('fs');
const ipsServer = require('../config/serversConf');
const dbFilePathToForty = './banco_de_dados/HTD_DB_FORTYFLEX.FDB';
const dbFilePathFromForty = '//' + ipsServer.fortyflex + '/HTD-FortyFlex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToBrysa = './banco_de_dados/HTD_DB_BRYSAFLEX.FDB';
const dbFilePathFromBrysa = '//' + ipsServer.fortyflex + '/HTD-Brysaflex/Banco_Dados/HTD_DB.FDB';
var today = new Date().getDate();
var lastTimeCopy = 0;

function copiarBds(callback) {
    if (lastTimeCopy == today) {
        callback({ err: 'Banco de dados já copiado hoje' }, []);
    }
    else {
        /**
        fs.copyFile(dbFilePathFromForty, dbFilePathToForty, (err) => {
            if (err) {
                callback(err, []);
            }
            else {
                console.log("Banco de dados Fortyflex copiado")
            }
        });
        
        fs.copyFile(dbFilePathFromBrysa, dbFilePathToBrysa, (err) => {
            if (err) {
                callback(err, []);
            }
            else {
                console.log("Banco de dados brysaflex copiado")
            }
        });
        **/
        lastTimeCopy = today;
        callback(undefined, { message: "ok" });


    }
}
module.exports = copiarBds;