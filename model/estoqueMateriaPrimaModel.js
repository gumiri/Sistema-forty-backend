var needUserPermission = true;
const mediaMPUsada = require('./fortyflex/mediaMPUsada');
const mpUsadaAlpha = require('./alphaflex/mediaMPUsada');
const mpUsadaVinil = require('./fortyvinil/mediaMPUsada');
const mpUsadaMang = require('./mangmaster/mediaMPUsada');


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

async function loadEstoque(dt1, dt2) {
    let r = [];
    let mediampUsado = await mediaMPUsada.mediaMPUsada(0, dt1, dt2);
    let alphaflex = await mpUsadaAlpha.mediaMPUsada(0, dt1, dt2);
    let fortyvinil = await mpUsadaVinil.mediaMPUsada(0, dt1, dt2);
    let mangmaster = await mpUsadaMang.mediaMPUsada(0, dt1, dt2);

    for (let i = 0; i < alphaflex.length; i++) {
        let alpha = alphaflex[i]['SALDO'] = (alphaflex[i]['QTMANG'] * mediampUsado[i]['MEDIAMP']);
        let vinil = fortyvinil[i]['SALDO'] = (fortyvinil[i]['QTMANG'] * mediampUsado[i]['MEDIAMP']);
        let mang = mangmaster[i]['SALDO'] = (mangmaster[i]['QTMANG'] * mediampUsado[i]['MEDIAMP']);
        let forty = mediampUsado[i]['SALDO'] = (mediampUsado[i]['QTMANGV'] * mediampUsado[i]['MEDIAMP']);
        let data = {
            "DES": alphaflex[i]['DES'],
            "ALPHAFLEX": alpha,
            "FORTYVINIL": vinil,
            "MANGMASTER": mang,
            "FORTYFLEX": forty,
            "TOTALMPUSADO": mediampUsado[i]['QTMP']
        }
        r.push(data)
    }

    return r;

}

async function getEstoque(token, date1, date2, callback) {
    if (needUserPermission) {
        if (token) {
            let userToken = tokens.getTokenObjectByToken(token);
            tokens.removeExpiredUserToken(userToken.user);
            if (userToken.token != token || !userToken.auth.includes('materia-prima')) {
                callback({ err: 'erro, usuário não autorizado' }, []);
                return 0;
            }
        }
        else {
            callback({ err: 'erro, usuário não autorizado' }, []);
            return 0;
        }
    }
    const estoque = await loadEstoque(date1, date2);
    if (!estoque) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { data: estoque });
    }
}

module.exports = getEstoque;