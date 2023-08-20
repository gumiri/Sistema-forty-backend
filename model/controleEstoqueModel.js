var needUserPermission = false;

const fortyflexEstoque = require('./fortyflex/controleEstoque');
const fortyvinilEstoque = require('./fortyvinil/controleEstoque');
const mangmasterEstoque = require('./mangmaster/controleEstoque');
const alphaflexEstoque = require('./alphaflex/controleEstoque');

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


async function loadEstoque(aPartirDe) {
    let forty = await fortyflexEstoque.getEntradaSaida(aPartirDe);
    let vinil = await fortyvinilEstoque.getEntradaSaida(aPartirDe);
    let mang = await mangmasterEstoque.getEntradaSaida(aPartirDe);
    let alpha = await alphaflexEstoque.getEntradaSaida(aPartirDe);
    var historico = []
    if (forty[0] != undefined) {
        historico.push(forty);
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
            let dt = new Date(hist.DTMOV);
            dt.setHours(hist.HR.slice(0, 2) - 3, hist.HR.slice(3, 5), hist.HR.slice(6, 8));
            let data = {
                'NOPERACAO': hist.MV,
                'DESCRICAO': hist.DES,
                'DATA': dt,
                'QUANTIDADE': hist.QT,
                'VALOR': hist.VLR,
                'ES': hist.TPES,
                'OPERACAO': (op[hist.PROGRAMA] != null ? op[hist.PROGRAMA] : hist.PROGRAMA),
                'FILIAL': hist.FILIAL,
            }
            r.push(data);
        }
    }
    for (let i = 0; i < r.length; i++) {
        for (let j = 0; j < r.length - i - 1; j++)
            if (r[j].DATA < r[j + 1].DATA) {
                let aux = r[j];
                r[j] = r[j + 1];
                r[j + 1] = aux;
            }
    }
    return r;
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