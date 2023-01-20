const fortyvinilEstoque = require('./fortyvinil/controleEstoque');

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

const op = {
    'CadMPAJUSTE': 'Ajuste',
    'CadArmazenEntrada': 'Compra',
    'CadMPREQ': 'Saída por requisição',
    'CadFTNF': 'Venda'
}

var aPartirDe = '01.01.2022';
var qtdMeses = Math.floor(new Date(new Date() - new Date(aPartirDe)).getTime() / 60 / 60 / 1000 / 24 / 30);

async function loadEstoque() {
    let fortyvinil = await fortyvinilEstoque.getEntradaSaida(aPartirDe);
    //unifica as informações em um array
    var r = [];
    let codigos = getCodigosEstoque(fortyvinil);
    for (let i = 0; i < codigos.length; i++) {
        let codigo = codigos[i];
        let descricao = getDescricaoByCodigo(codigo, fortyvinil);
        let qtdVendida = getQtVendidaByCodigo(codigo, fortyvinil);
        let dtUltimaCompra = getQtdEDataDaUltimaCompraByCodigo(codigo, fortyvinil).dataUltimaCompra;
        let qtdUltimaCompra = getQtdEDataDaUltimaCompraByCodigo(codigo, fortyvinil).qtdUltimaCompra;
        let qtdComprada = getQtdEDataDaUltimaCompraByCodigo(codigo, fortyvinil).qtd ;
        let mediamensal = qtdVendida / qtdMeses;
        let saldo = qtdComprada - qtdVendida;
        let data = {
            'CODIGO' : codigo,
            'DESCRICAO' : descricao,
            'DATAULTIMACOMPRA' : dtUltimaCompra,
            'QUANTIDADEULTIMACOMPRA' : qtdUltimaCompra,
            'QTVENDIDA' : qtdVendida,
            'QUANTIDADECOMPRADA' : qtdComprada,
            'MEDIAMENSAL' :  mediamensal,
            'SALDO': saldo
        }
        r.push(data);
    }
    
    return r;
}


function getCodigosEstoque(estoque) {
    let r = [];
    let isInr;
    for (let i = 0; i < estoque.length; i++) {
        for (let z = 0; z < r.length; z++) {
            if (estoque[i].CODIALMO == r[z]) {
                isInr = true;
                break;
            }
        }
        if (!isInr) {
            r.push(estoque[i].CODIALMO);
        }
        else {
            isInr = false;
        }
    }
    return r;
}

function getDescricaoByCodigo(codigo, estoque){
    for (let i = 0; i < estoque.length; i++){
        if (codigo == estoque[i].CODIALMO){
            return estoque[i].DES;
        }
    }
    return null;
}
function getQtVendidaByCodigo(codigo, estoque){
    totalDeVendas = 0;
    for (let i = 0; i < estoque.length; i++){
        if ((estoque[i].MV == 50 || estoque[i].MV == 54) && codigo == estoque[i].CODIALMO){
            totalDeVendas += estoque[i].QT;
        }
    }
    return totalDeVendas;
}
function getQtdEDataDaUltimaCompraByCodigo(codigo, estoqueP){
    let estoque = estoqueP;
    //sortList(estoque);
    let dataUltimaCompra = new Date(aPartirDe);
    let qtdUltimaCompra = 0;
    let qtd = 0;
    for (let i = 0; i < estoque.length; i++){
        if(estoque[i].CODIALMO == codigo && dataUltimaCompra < estoque[i].DTMOV && estoque[i].MV == 1){
            dataUltimaCompra = estoque[i].DTMOV;
            qtdUltimaCompra = estoque[i].QT;
        }
    }
    for (let i = 0; i < estoque.length; i++){
        if(estoque[i].CODIALMO == codigo && estoque[i].MV == 1){
            qtd += estoque[i].QT;
        }
    }
    return {dataUltimaCompra, qtd, qtdUltimaCompra};
}

async function getEstoque(token, callback) {
    if (token) {
        let userToken = tokens.getTokenObjectByToken(token);
        tokens.removeExpiredUserToken(userToken.user);
        if (userToken.token != token || !userToken.auth.includes('estoque')) {
            callback({ err: 'erro, usuário não autorizado' }, []);
            return 0;
        }
    }
    else{
        callback({ err: 'erro, usuário não autorizado' }, []);
        return 0;
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