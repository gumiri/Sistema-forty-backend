var needUserPermission = false;

const fortyflexEstoque = require('./fortyflex/quantidadeEstoqueNaData');

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


async function loadEstoque(dataLimite) {
    let forty = await fortyflexEstoque.getEntradaSaida(dataLimite);
    let date = new Date(dataLimite);
    //unifica as informações em um array
    r = [];


    let codigos = getCodigosEstoque(forty);
    for (let i = 0; i < codigos.length; i++) {
        let codigo = codigos[i];
        let descricao = getDescricaoByCodigo(codigo, forty);
        let qtd = 0;
        let estoque = contEstoque(codigo, forty);
        qtd = estoque.retorno;

        let data = {
            'DESCRICAO': descricao,
            'QTD': qtd,
        }
        r.push(data);
    }

    return r;
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

function getCodigosEstoque(estoque) {
    let r = [];
    let isInr;
    for (let i = 0; i < estoque.length; i++) {
        for (let z = 0; z < r.length; z++) {
            if (estoque[i].ITEM == r[z]) {
                isInr = true;
                break;
            }
        }
        if (!isInr) {
            r.push(estoque[i].ITEM);
        }
        else {
            isInr = false;
        }
    }
    return r;
}

function getDescricaoByCodigo(codigo, estoque) {
    for (let i = 0; i < estoque.length; i++) {
        if (codigo == estoque[i].ITEM) {
            return estoque[i].DES;
        }
    }
    return null;
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