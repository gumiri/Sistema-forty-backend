const { dirname } = require('path');
const pathFile =  dirname(require.main.filename) + '/model/mangmaster/mapMateriaPrima.json';
const fs = require('fs');


function postMPFortyflex(file, callback){
    if(file){
        fs.writeFile(pathFile, JSON.stringify(file), (err) => {
            if (err){
                callback({err}, []);
            }
            else{
                callback(undefined, { data: 'Arquivo gravado com sucesso!'})
            }
        })
    }
    else{
        callback({ err: 'Erro! Não foi recebido nenhum arquivo'}, [])
    }
}

module.exports = postMPFortyflex;