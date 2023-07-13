const fortyflexHistorico = require('./fortyflex/historicoCliente');
const brysaflexHistorico = require('./brysaflex/historicoCliente');
const fortyvinilHistorico = require('./fortyvinil/historicoCliente');
const mangmasterHistorico = require('./mangmaster/historicoCliente');
const alphaflexHistorico = require('./alphaflex/historicoCliente');


function diasDeAtraso (dtven, dtrec){
    let atraso = dtrec - dtven;    
    if (atraso >= 0 ){
        atraso = atraso / 60 / 60 / 24 / 1000;
        return atraso;
    }
    else{
        return 0;
    }
}

async function loadHistorico(codigoCliente, dtHoje, qtdRegistros) {
    let result = [];
    let forty = await fortyflexHistorico.getHistoricoCliente(codigoCliente, dtHoje, qtdRegistros);
    let brysa = await brysaflexHistorico.getHistoricoCliente(codigoCliente, dtHoje, qtdRegistros);
    let vinil = await fortyvinilHistorico.getHistoricoCliente(codigoCliente, dtHoje, qtdRegistros);
    let mang = await mangmasterHistorico.getHistoricoCliente(codigoCliente, dtHoje, qtdRegistros);
    let alpha = await alphaflexHistorico.getHistoricoCliente(codigoCliente, dtHoje, qtdRegistros);
    var historico = []
    if (forty[0] != undefined) {
        historico.push(forty);
    }
    if (brysa[0] != undefined) {
        historico.push(brysa);
    }
    if (vinil[0] != undefined) {
        historico.push(vinil);
    }
    if (mang[0] != undefined) {
        historico.push(mang);
    }
    if (alpha[0] != undefined) {
        historico.push(alpha);
    }
    //unifica as informações em um array
    var r = [];
    for (let i = 0; i < historico.length; i++) {
        for (let z = 0; z < historico[i].length; z++) {
            let hist = historico[i][z];
            let data = {
                'CNPJ': hist.CNPJCPF,
                'CODIV': hist.CODIV,
                'ESPE': hist.ESPE,
                'SERIE': hist.SERIE,
                'NRTIT': hist.NRTIT,
                'SEQ': hist.SEQ,
                'DTVEN': hist.DTVEN,
                'DTMOV': hist.DTMOV,
                'DTREC': hist.DTREC,
                'ATRASO': diasDeAtraso(hist.DTVEN, hist.DTREC),
                'VLR': hist.VLR,
                'VLRPAGO': hist.VLRPAGO,
                'DIVIDA': hist.DIVIDA,
                'PED': hist.PED,
                'FILIAL': hist.FILIAL
            }
            r.push(data);
        }
    }
    //sort
    for (let i = 0; i < r.length; i++) {
        for (let j = 0; j < r.length - i - 1; j++)
            if (r[j].DTREC > r[j + 1].DTREC) {
                let aux = r[j];
                r[j] = r[j + 1];
                r[j + 1] = aux;
            }
    }
    if (r.length >= 3){
        for (let i = 0; i < qtdRegistros; i++){
            result.push(r[r.length -(i)])
        }
        //r = [r[r.length - 1], r[r.length - 2], r[r.length - 3]];
    }

    return r;
}
async function getHistoricoCliente(codigoCliente, dtHoje, callback) {
    let qtdRegistros = 10;
    let dt = dtHoje;
    dt = dt.substring(0, 4) + '.' + dt.substring(4, 6) + '.' + dt.substring(6, 8);
    var historico = await loadHistorico(codigoCliente, dt, qtdRegistros);
    if (!historico) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { data: historico });
    }
}

module.exports = getHistoricoCliente;