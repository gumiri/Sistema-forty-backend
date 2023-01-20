const fs = require('fs');
const ipsServer = require('../config/serversConf');
const dbFilePathToForty = './banco_de_dados/HTD_DB_FORTYFLEX.FDB';
const dbFilePathToFortyTemp = './banco_de_dados/HTD_DB_FORTYFLEXTemp.FDB';
const dbFilePathFromForty = '//' + ipsServer.fortyflex + '/HTD-FortyFlex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToBrysa = './banco_de_dados/HTD_DB_BRYSAFLEX.FDB';
const dbFilePathToBrysaTemp = './banco_de_dados/HTD_DB_BRYSAFLEXTemp.FDB';
const dbFilePathFromBrysa = '//' + ipsServer.fortyflex + '/HTD-Brysaflex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToAlpha = './banco_de_dados/HTD_DB_ALPHAFLEX.FDB';
const dbFilePathToAlphaTemp = './banco_de_dados/HTD_DB_ALPHAFLEXTemp.FDB';
const dbFilePathFromAlpha = '//' + ipsServer.alphaflex + '/htd_ff_alphaflex/Banco_Dados/HTD_DB.FDB';
const dbFilePathToVinil = './banco_de_dados/HTD_DB_FORTYVINIL.FDB';
const dbFilePathToVinilTemp = './banco_de_dados/HTD_DB_FORTYVINILTemp.FDB';
const dbFilePathFromVinil = '//' + ipsServer.fortyflex + '/HTD-FortyVinil/Banco_Dados/HTD_DB.FDB';
const dbFilePathToMang = './banco_de_dados/HTD_DB_MANGMASTER.FDB';
const dbFilePathToMangTemp = './banco_de_dados/HTD_DB_MANGMASTERTemp.FDB';
const dbFilePathFromMang = '//' + ipsServer.fortyflex + '/HTD-MangMaster/Banco_Dados/HTD_DB.FDB';

async function copiarBds() {
    await copyFortyflexDB(dbFilePathFromForty, dbFilePathToFortyTemp);
    console.log("BD Forty copiado!");
    await copyBrysaflexDB(dbFilePathFromBrysa, dbFilePathToBrysaTemp);
    console.log("BD Brysa copiado!");
    await copyAlphaflexDB(dbFilePathFromAlpha, dbFilePathToAlphaTemp);
    console.log("BD Alpha copiado!");
    await copyFortyvinilDB(dbFilePathFromVinil, dbFilePathToVinilTemp);
    console.log("BD Fortyvinil copiado!");
    await copyMangmasterDB(dbFilePathFromMang, dbFilePathToMangTemp);
    console.log("BD Mang copiado!");
}

function copyFortyflexDB(dbFilePathFromForty, dbFilePathToFortyTemp) {
    console.log('Copiando Banco de dados Fortyflex');
    return new Promise(resolve => {
        //let copy = fs.createReadStream('./banco_de_dados/HTD_DB_FORTYFLEX.FDB').pipe(fs.createWriteStream('./dt.FDB'));
        //resolve(copy);
        fs.copyFile(dbFilePathFromForty, dbFilePathToFortyTemp, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true)
            }
        });
    });
}

function copyBrysaflexDB(dbFilePathFromBrysa, dbFilePathToBrysaTemp) {
    console.log('Copiando Banco de dados Brysaflex');
    return new Promise(resolve => {
        fs.copyFile(dbFilePathFromBrysa, dbFilePathToBrysaTemp, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true)
            }
        })
    });
}
function copyAlphaflexDB(dbFilePathFromAlpha, dbFilePathToAlphaTemp) {
    console.log('Copiando Banco de dados Alphaflex');
    return new Promise(resolve => {
        fs.copyFile(dbFilePathFromAlpha, dbFilePathToAlphaTemp, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true)
            }
        })
    });
}
function copyFortyvinilDB(dbFilePathFromVinil, dbFilePathToVinilTemp) {
    console.log('Copiando Banco de dados Fortyvinil');
    return new Promise(resolve => {
        fs.copyFile(dbFilePathFromVinil, dbFilePathToVinilTemp, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true)
            }
        })
    });
}
function copyMangmasterDB(dbFilePathFromMang, dbFilePathToMangTemp) {
    console.log('Copiando Banco de dados Mangmaster');
    return new Promise(resolve => {
        fs.copyFile(dbFilePathFromMang, dbFilePathToMangTemp, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true)
            }
        })
    });
}
function renameFileFortyflex() {
    return new Promise(resolve => {
        fs.rename(dbFilePathToFortyTemp, dbFilePathToForty, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true);
            }
        })
    });
}
function renameFileBrysaflex() {
    return new Promise(resolve => {
        fs.rename(dbFilePathToBrysaTemp, dbFilePathToBrysa, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true);
            }
        })
    });
}
function renameFileAlphaflex() {
    return new Promise(resolve => {
        fs.rename(dbFilePathToAlphaTemp, dbFilePathToAlpha, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true);
            }
        })
    });
}
function renameFileMangmaster() {
    return new Promise(resolve => {
        fs.rename(dbFilePathToMangTemp, dbFilePathToMang, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true);
            }
        })
    });
}
function renameFileFortyvinil() {
    return new Promise(resolve => {
        fs.rename(dbFilePathToVinilTemp, dbFilePathToVinil, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                resolve(true);
            }
        })
    });
}



module.exports = {
    copiarBds,
    renameFileAlphaflex, 
    renameFileBrysaflex, 
    renameFileFortyflex, 
    renameFileFortyvinil, 
    renameFileMangmaster
};