var needUserPermission = true;
const alphaflexEstoque = require('./alphaflex/controleEstoque');
const mangmasterEstoque = require('./mangmaster/controleEstoque');
const fortyflexEstoque = require('./fortyflex/controleEstoque');
const fortyvinilEstoque = require('./fortyvinil/controleEstoque');
const fortyflexEstoqueSReq = require('./fortyflex/controleEstoqueSReq');
const alphaflexEstoqueAtual = require('./alphaflex/controleEstoqueAtual');
const fortyflexEstoqueAtual = require('./fortyflex/controleEstoqueAtual');
const fortyvinilEstoqueAtual = require('./fortyvinil/controleEstoqueAtual');
const fornecedores = require('./fortyflex/controleEstoqueFornecedor');
const codigosMaterial = require('./mapaCodigosAcessorios.json');
const logEstoqueFortyflex = require('./fortyflex/logEstoque');
const logEstoqueAlphaflex = require('./alphaflex/logEstoque');
const logEstoqueFortyvinil = require('./fortyvinil/logEstoque');
const logEstoqueMangmaster = require('./mangmaster/logEstoque');
const fortyflexEstoqueNaData = require('./fortyflex/quantidadeEstoqueNaData');
const alphaflexEstoqueNaData = require('./alphaflex/quantidadeEstoqueNaData');
const fortyvinilEstoqueNaData = require('./fortyvinil/quantidadeEstoqueNaData');
const mangmasterEstoqueNaData = require('./mangmaster/quantidadeEstoqueNaData');

const tokens = require('./auth/tokens');
const { application } = require('express');

dateToString = function (date) {
    if (date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [(dd > 9 ? '' : '0') + dd + '.',
        (mm > 9 ? '' : '0') + mm + '.',
        date.getFullYear()
        ].join('');
    }
    else {
        return null;
    }
};

async function loadEstoque(aPartirDe) {
    let fornecedoresFortyflex = await fornecedores.getEntradaFornecedores();

    let fortyflexDataAtual = await fortyflexEstoqueNaData.getEntradaSaida(aPartirDe);
    let alphaflexDataAtual = await alphaflexEstoqueNaData.getEntradaSaida(aPartirDe);
    let fortyvinilDataAtual = await fortyvinilEstoqueNaData.getEntradaSaida(aPartirDe);
    let mangmasterDataAtual = await mangmasterEstoqueNaData.getEntradaSaida(aPartirDe);

    let alphaEstoqueAtual = await alphaflexEstoqueAtual.getEstoque();
    let fortyEstoqueAtual = await fortyflexEstoqueAtual.getEstoque();
    let vinilEstoqueAtual = await fortyvinilEstoqueAtual.getEstoque();

    var lestoqueAlpha = await logEstoqueAlphaflex.getEntradaSaida(aPartirDe);
    var lestoqueForty = await logEstoqueFortyflex.getEntradaSaida(aPartirDe);
    var lestoqueVinil = await logEstoqueFortyvinil.getEntradaSaida(aPartirDe);

    var lestoqueMang = await logEstoqueMangmaster.getEntradaSaida(aPartirDe);

    let alpha = await alphaflexEstoque.getEntradaSaida(aPartirDe);
    let forty = await fortyflexEstoque.getEntradaSaida(aPartirDe);
    let vinil = await fortyvinilEstoque.getEntradaSaida(aPartirDe);
    let mang = await mangmasterEstoque.getEntradaSaida(aPartirDe);
    let r = [];

    for (let i = 0; i < codigosMaterial.length; i++) {
        let descricao = codigosMaterial[i].Descricao;
        let qtdVendidaAlpha = getQtVendidaByCodigo(codigosMaterial[i]['Alphaflex'], alpha, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Alphaflex');
        let qtdVendidaForty = getQtVendidaByCodigo(codigosMaterial[i]['Fortyflex'], forty, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Fortyflex');
        let qtdVendidaVinil = getQtVendidaByCodigo(codigosMaterial[i]['Fortyvinil'], vinil, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Fortyvinil');
        let qtdVendidaMang = getQtVendidaByCodigo(codigosMaterial[i]['Mangmaster'], mang, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Mangmaster');
        let qtdCompradaAlpha = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Alphaflex'], alpha, aPartirDe, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Alphaflex').qtd;
        let qtdCompradaForty = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Fortyflex'], forty, aPartirDe, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Fortyflex').qtd;
        let qtdCompradaVinil = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Fortyvinil'], vinil, aPartirDe, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Fortyvinil').qtd;
        let qtdCompradaMang = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Mangmaster'], mang, aPartirDe, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, codigosMaterial, 'Mangmaster').qtd;
        let alphaflex = qtdCompradaAlpha - qtdVendidaAlpha;
        let fortyflex = qtdCompradaForty - qtdVendidaForty;
        let fortyvinil = qtdCompradaVinil - qtdVendidaVinil;
        let mangmaster = qtdCompradaMang - qtdVendidaMang;
        let qtdEstoqueAtual = getQtdAtualByCodigo(codigosMaterial[i]['Alphaflex'], alphaEstoqueAtual)
            + getQtdAtualByCodigo(codigosMaterial[i]['Fortyflex'], fortyEstoqueAtual)
            + getQtdAtualByCodigo(codigosMaterial[i]['Fortyvinil'], vinilEstoqueAtual);
        let qtdEstoqueForty = contEstoque(codigosMaterial[i]['Fortyflex'], fortyflexDataAtual).retorno;
        let qtdEstoqueAlpha = contEstoque(codigosMaterial[i]['Alphaflex'], alphaflexDataAtual).retorno;
        let qtdEstoquevinil = contEstoque(codigosMaterial[i]['Fortyvinil'], fortyvinilDataAtual).retorno;
        let qtdEstoqueNaData = qtdEstoqueForty + qtdEstoqueAlpha + qtdEstoquevinil;
        let fornecedor = getFornecedorByCodigo(codigosMaterial[i]['Fortyflex'], fornecedoresFortyflex);

        let data = {
            'DESCRICAO': descricao,
            'SALDOALPHAFLEX': alphaflex,
            'SALDOFORTYFLEX': fortyflex,
            'SALDOFORTYVINIL': fortyvinil,
            'SALDOMANGMASTER': mangmaster,
            'SALDOTOTAL': alphaflex + fortyflex + fortyvinil + mangmaster,
            'ESTOQUENADATA': qtdEstoqueNaData,
            'ESTOQUEATUAL': qtdEstoqueAtual,
            'FORNECEDORES': fornecedor

        }
        r.push(data);
    }
    

    return r;
}

function getFornecedorByCodigo(codigo, estoque) {
    let result = [];
    let isInResult = false;
    for (let i = 0; i < estoque.length; i++) {
        if (codigo == estoque[i]['CODIALMO']) {
            for (let z = 0; z < r.length; z++) {
                if (estoque[i]['NOME'] == result[z]) {
                    isInResult = true;
                }
            }
            if (isInResult == false) {
                result.push(estoque[i]['NOME']);
            }
        }
        isInResult = false;
    }
    return result;
}

function getQtdAtualByCodigo(codigo, estoque) {
    for (let i = 0; i < estoque.length; i++) {
        if (codigo == estoque[i]['CODIALMO']) {
            return estoque[i]['QTATU'];
        }
    }
    return 0;
}

function getQtdEDataDaUltimaCompraByCodigo(codigo, estoqueP, aPartirDe, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, map, filial) {
    let estoque = estoqueP;
    let dataUltimaCompra = new Date(aPartirDe);
    let qtdUltimaCompra = 0;
    let qtd = 0;
    for (let i = 0; i < estoque.length; i++) {
        if (estoque[i].CODIALMO == codigo && dataUltimaCompra < estoque[i].DTMOV && estoque[i].MV == 1) {
            dataUltimaCompra = estoque[i].DTMOV;
            qtdUltimaCompra = estoque[i].QT;
        }
    }
    for (let i = 0; i < estoque.length; i++) {
        if (estoque[i].CODIALMO == codigo) {
            if (estoque[i].MV == 1){
                qtd += estoque[i].QT;
            }
            else if (estoque[i]['PROGRAMA'] == 'CadMPAJUSTE'){
                let verificarAlpha = verificarEstoqueSaida(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueAlpha, map, filial, 'Alphaflex');
                let verificarForty = verificarEstoqueSaida(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueForty, map, filial, 'Fortyflex');
                let verificarVinil = verificarEstoqueSaida(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueVinil, map, filial, 'Fortyvinil');
                let verificarMang = verificarEstoqueSaida(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueMang, map, filial, 'Mangmaster');
                if (verificarAlpha == false && verificarForty == false && verificarVinil == false && verificarMang == false) {
                    qtd += estoque[i]['QT'];
                }
            }
        }
    }
    return { dataUltimaCompra, qtd, qtdUltimaCompra };
}

function getQtVendidaByCodigo(codigo, estoque, lestoqueAlpha, lestoqueForty, lestoqueVinil, lestoqueMang, map, filial) {
    totalDeVendas = 0;
    for (let i = 0; i < estoque.length; i++) {
        if (estoque[i]['TPES'] == 'S   '  && codigo == estoque[i]['CODIALMO']) {
            if (estoque[i]['PROGRAMA'] == 'CadFTNF' || estoque[i]['PROGRAMA'] == 'AlocacaoNota') {
                totalDeVendas += estoque[i].QT;
            }
            else if (estoque[i]['PROGRAMA'] = 'CadMPREQ') {
                let verificarAlpha = verificarEstoque(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueAlpha, map, filial, 'Alphaflex');
                let verificarForty = verificarEstoque(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueForty, map, filial, 'Fortyflex');
                let verificarVinil = verificarEstoque(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueVinil, map, filial, 'Fortyvinil');
                let verificarMang = verificarEstoque(estoque[i]['DTMOV'], estoque[i]['CODIALMO'], estoque[i]['QT'], lestoqueMang, map, filial, 'Mangmaster');

                if (!verificarAlpha && !verificarForty && !verificarVinil && !verificarMang) {
                    totalDeVendas += estoque[i]['QT'];
                }
            }
        }
    }
    return totalDeVendas;
}

function mapCodigo(codigo, map, filial, filialReturn){
    for (let i = 0; i < map.length; i++){
        if (codigo == map[i][filial]){
            return map[i][filialReturn];
        }
    }
    return null;
}

function verificarEstoque(data, codigo, qtd, logEstoque, map, filial, filialReturn) {
    for (let i = 0; i < logEstoque.length; i++) {
        if (data.getTime() == logEstoque[i]['DT'].getTime()) {
            if (mapCodigo(codigo, map, filial, filialReturn) == logEstoque[i]['ITEM']) {
                if (qtd == logEstoque[i]['QT'] && logEstoque[i]['ES'] == 'E   ' && logEstoque[i]['PROGRAMA'] == 'CadMPAJUSTE') {
                    return logEstoque[i];
                }
            }
        }
    }
    return false;
}
function verificarEstoqueSaida(data, codigo, qtd, logEstoque,  map, filial, filialReturn) {
    for (let i = 0; i < logEstoque.length; i++) {
        if (data.getTime() == logEstoque[i]['DT'].getTime()) {
            if (mapCodigo(codigo, map, filial, filialReturn) == logEstoque[i]['ITEM']) {
                if (qtd == logEstoque[i]['QT'] && logEstoque[i]['ES'] == 'S   ' && logEstoque[i]['PROGRAMA'] == 'CadMPREQ') {
                    return true;
                }
            }
        }
    }
    return false;
}

function contEstoque(codigo, estoque) {
    let dt = new Date(0);
    let hr = '00:00:00';
    let listaDeRetornoPorCodigo = [];
    let retorno = 0;
    for (let i = 0; i < estoque.length; i++) {
        if (codigo == estoque[i].ITEM) {
            if (estoque[i].DT != null) {
                let data = {
                    qtdEstoque: estoque[i]['MPLOTE_QTATU'] + estoque[i]['MPLOTE_QTENT'] - estoque[i]['MPLOTE_QTSAI'],
                    hr: estoque[i]['HR'],
                    dt: estoque[i]['DT'],
                    qtsai: estoque[i]['MPLOTE_QTSAI']
                }
                listaDeRetornoPorCodigo.push(data);
            }
        }
    }
    for (let i = 0; i < listaDeRetornoPorCodigo.length; i++) {
        if(listaDeRetornoPorCodigo[i].dt >= dt){
            if (listaDeRetornoPorCodigo[i].hr > hr) {
                hr = listaDeRetornoPorCodigo[i].hr;
                dt = listaDeRetornoPorCodigo[i].dt;
                retorno = listaDeRetornoPorCodigo[i].qtdEstoque;
            }
        }
    }
    return {retorno, dt, hr};
}



















async function getEstoque(token, date, callback) {
    if (needUserPermission) {
        if (token) {
            let userToken = tokens.getTokenObjectByToken(token);
            tokens.removeExpiredUserToken(userToken.user);
            if (userToken.token != token || !userToken.auth.includes('estoque')) {
                callback({ err: 'erro, usuário não autorizado' }, []);
                return 0;
            }
        }
        else {
            callback({ err: 'erro, usuário não autorizado' }, []);
            return 0;
        }
    }
    const estoque = await loadEstoque(date);
    if (!estoque) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { data: estoque });
    }
}

module.exports = getEstoque;