const htdUnificado = require('./htd_clientes/gcliente');
const fortyflex = require('./fortyflex/ctrec');
const alphaflex = require('./alphaflex/ctrec');
const brysaflex = require('./brysaflex/ctrec');
const fortyvinil = require('./fortyvinil/ctrec');
const mangmaster = require('./mangmaster/ctrec');

async function getCtRec(callback){
    var r = await fortyflex.getCtRec('01.01.2019');
    if(!r){
        callback({erro: 'Não foi possível acessar banco de dados'},[]);
    }
    else{
        callback(undefined,{r});
    }
}

module.exports = getCtRec;