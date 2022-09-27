const fs = require('fs');
const ipsServer = require('../config/serversConf');
const dbFilePathToForty = './banco_de_dados/HTD_DB_FORTYFLEX.FDB';
const dbFilePathFromForty = '//' + ipsServer.fortyflex + '/HTD-FortyFlex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToBrysa = './banco_de_dados/HTD_DB_BRYSAFLEX.FDB';
const dbFilePathFromBrysa = '//' + ipsServer.fortyflex + '/HTD-Brysaflex/Banco_Dados/HTD_DB.FDB';
var today = new Date().getDate();
var lastTimeCopy = 0;

async function copiarBds(callback) {
    if (lastTimeCopy == today) {
        callback({ err: 'Banco de dados já copiado hoje' }, []);
    }
    else {
        await copyFortyflexDB(dbFilePathFromForty, dbFilePathToForty);
        console.log("BD Forty copiado!");
        await copyBrysaflexDB(dbFilePathFromBrysa, dbFilePathToBrysa);
        console.log("BD Brysa copiado!");
        lastTimeCopy = today;
        callback(undefined, { message: "ok" });
    }
}

function copyFortyflexDB(dbFilePathFromForty, dbFilePathToForty) {
    console.log('Copiando Banco de dados Fortyflex');
    return new Promise(resolve => {
        setTimeout(() => {
            fs.copyFile(dbFilePathFromForty, dbFilePathToForty, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    resolve(true)
                }
            });
        }, 320000)
    });
}

function copyBrysaflexDB(dbFilePathFromBrysa, dbFilePathToBrysa) {
    console.log('Copiando Banco de dados Brysaflex');
    return new Promise(resolve => {
        setTimeout(() => {
            fs.copyFile(dbFilePathFromBrysa, dbFilePathToBrysa, (err) => {
                if (err) {
                    throw err;
                }
                else {
                    resolve(true)
                }
            })
        }, 320000);
    });
}



module.exports = copiarBds;