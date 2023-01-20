var needUserPermission = false;


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

const tokens = require('./auth/tokens');

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

var aPartirDe = '01.01.2022';

async function loadEstoque() {
    let alpha = await alphaflexEstoque.getEntradaSaida(aPartirDe);
    let forty = await fortyflexEstoque.getEntradaSaida(aPartirDe);
    let vinil = await fortyvinilEstoque.getEntradaSaida(aPartirDe);
    let mang = await mangmasterEstoque.getEntradaSaida(aPartirDe);
    let alphaEstoqueAtual = await alphaflexEstoqueAtual.getEstoque();
    let fortyEstoqueAtual = await fortyflexEstoqueAtual.getEstoque();
    let vinilEstoqueAtual = await fortyvinilEstoqueAtual.getEstoque();
    let fortyEstoqueSreq = await fortyflexEstoqueSReq.getEntradaSaida(aPartirDe);
    let fornecedoresFortyflex = await fornecedores.getEntradaFornecedores();
    //unifica as informações em um array
    var r = [];

    for (let i = 0; i < codigosMaterial.length; i++) {
        let descricao = codigosMaterial[i].Descricao;
        let qtVendidaAlpha = getQtVendidaByCodigo(codigosMaterial[i]['Alphaflex'], alpha);
        let qtVendidaForty = getQtVendidaByCodigoForty(codigosMaterial[i]['Fortyflex'], forty, fortyEstoqueSreq);
        let qtVendidaVinil = getQtVendidaByCodigo(codigosMaterial[i]['Fortyvinil'], vinil);
        let qtVendidaMang = getQtVendidaByCodigo(codigosMaterial[i]['Mangmaster'], mang);
        let qtdCompradaAlpha = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Alphaflex'], alpha).qtd;
        let qtdCompradaForty = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Fortyflex'], forty).qtd;
        let qtdCompradaVinil = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Fortyvinil'], vinil).qtd;
        let qtdCompradaMang = getQtdEDataDaUltimaCompraByCodigo(codigosMaterial[i]['Mangmaster'], mang).qtd;
        let saldoForty = qtdCompradaForty - qtVendidaForty;
        let saldoAlpha = qtdCompradaAlpha - qtVendidaAlpha;
        let saldoVinil = qtdCompradaVinil - qtVendidaVinil;
        let saldoMang = qtdCompradaMang - qtVendidaMang;
        let qtdEstoqueAtual = getQtdAtualByCodigo(codigosMaterial[i]['Alphaflex'], alphaEstoqueAtual)
            + getQtdAtualByCodigo(codigosMaterial[i]['Fortyflex'], fortyEstoqueAtual)
            + getQtdAtualByCodigo(codigosMaterial[i]['Fortyvinil'], vinilEstoqueAtual);
        let fornecedor = getFornecedorByCodigo(codigosMaterial[i]['Fortyflex'], fornecedoresFortyflex);

        let data = {
            'DESCRICAO': descricao,
            'SALDOFORTYFLEX': saldoForty,
            'SALDOALPHAFLEX': saldoAlpha,
            'SALDOFORTYVINIL': saldoVinil,
            'SALDOMANGMASTER': saldoMang,
            'SALDOTOTAL': saldoForty + saldoAlpha + saldoVinil + saldoMang,
            'ESTOQUEATUAL': qtdEstoqueAtual,
            'FORNECEDORES' : fornecedor

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

function getQtVendidaByCodigoForty(codigo, estoque, estoqueSReq) {
    totalDeVendas = 0;
    for (let i = 0; i < estoque.length; i++) {
        if ((estoque[i].MV == 50 || estoque[i].MV == 54) && codigo == estoque[i].CODIALMO) {
            totalDeVendas += estoque[i].QT;
        }
    }
    for (let i = 0; i < estoqueSReq.length; i++) {
        if (estoqueSReq[i].CODIMPCC == 1 && codigo == estoqueSReq[i].CODIALMO) {
            totalDeVendas += estoqueSReq[i].QT;
        }
    }
    return totalDeVendas;
}
function getQtVendidaByCodigo(codigo, estoque) {
    totalDeVendas = 0;
    for (let i = 0; i < estoque.length; i++) {
        if ((estoque[i].MV == 50 || estoque[i].MV == 54) && codigo == estoque[i].CODIALMO) {
            totalDeVendas += estoque[i].QT;
        }
    }
    return totalDeVendas;
}

function getQtdEDataDaUltimaCompraByCodigo(codigo, estoqueP) {
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
        if (estoque[i].CODIALMO == codigo && estoque[i].MV == 1) {
            qtd += estoque[i].QT;
        }
    }
    return { dataUltimaCompra, qtd, qtdUltimaCompra };
}

async function getEstoque(token, callback) {
    if (!needUserPermission) {
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
    const estoque = await loadEstoque();
    if (!estoque) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { data: estoque });
    }
}

module.exports = getEstoque;