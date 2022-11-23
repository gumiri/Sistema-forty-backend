const fs = require('fs');
const ipsServer = require('../config/serversConf');
const dbFilePathToForty = './banco_de_dados/HTD_DB_FORTYFLEX.FDB';
const dbFilePathFromForty = '//' + ipsServer.fortyflex + '/HTD-FortyFlex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToBrysa = './banco_de_dados/HTD_DB_BRYSAFLEX.FDB';
const dbFilePathFromBrysa = '//' + ipsServer.fortyflex + '/HTD-Brysaflex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToAlpha = './banco_de_dados/HTD_DB_ALPHAFLEX.FDB';
const dbFilePathFromAlpha = '//' + ipsServer.alphaflex + '/htd_ff_alphaflex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToVinil = './banco_de_dados/HTD_DB_FORTYVINIL.FDB';
const dbFilePathFromVinil = '//' + ipsServer.fortyflex + '/HTD-FortyVinil/Banco_Dados/HTD_DB.FDB';
const dbFilePathToMang = './banco_de_dados/HTD_DB_MANGMASTER.FDB';
const dbFilePathFromMang = '//' + ipsServer.fortyflex + '/HTD-MangMaster/Banco_Dados/HTD_DB.FDB';
var today = new Date();
nowInHour = today.getHours();
var timeToCopy = 6;

async function copiarBds() {
    if (timeToCopy == nowInHour) {
        await copyFortyflexDB(dbFilePathFromForty, dbFilePathToForty);
        console.log("BD Forty copiado!");
        await copyBrysaflexDB(dbFilePathFromBrysa, dbFilePathToBrysa);
        console.log("BD Brysa copiado!");
        await copyAlphaflexDB(dbFilePathFromAlpha, dbFilePathToAlpha);
        console.log("BD Alpha copiado!");
        await copyFortyvinilDB(dbFilePathFromVinil, dbFilePathToVinil);
        console.log("BD Fortyvinil copiado!");
        await copyMangmasterDB(dbFilePathFromMang, dbFilePathToMang);
        console.log("BD Mang copiado!");
    }
    else{
        console.log(nowInHour);
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
function copyAlphaflexDB(dbFilePathFromAlpha, dbFilePathToAlpha) {
    console.log('Copiando Banco de dados Brysaflex');
    return new Promise(resolve => {
        setTimeout(() => {
            fs.copyFile(dbFilePathFromAlpha, dbFilePathToAlpha, (err) => {
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
function copyFortyvinilDB(dbFilePathFromVinil, dbFilePathToVinil) {
    console.log('Copiando Banco de dados Brysaflex');
    return new Promise(resolve => {
        setTimeout(() => {
            fs.copyFile(dbFilePathFromVinil, dbFilePathToVinil, (err) => {
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
function copyMangmasterDB(dbFilePathFromMang, dbFilePathToMang) {
    console.log('Copiando Banco de dados Brysaflex');
    return new Promise(resolve => {
        setTimeout(() => {
            fs.copyFile(dbFilePathFromMang, dbFilePathToMang, (err) => {
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