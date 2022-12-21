const fortyflexGcliente = require('./fortyflex/gcliente');
const brysaflexGcliente = require('./brysaflex/gcliente');
const fortyvinilGcliente = require('./fortyvinil/gcliente');
const mangmasterGcliente = require('./mangmaster/gcliente');
const alphaflexGcliente = require('./alphaflex/gcliente');
const { BinaryTreeSearch } = require('./clientTree');

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


async function todosClientes(orderBy) {
    var clientes = [
        await fortyflexGcliente.getClientes(),
        await brysaflexGcliente.getClientes(),
        await fortyvinilGcliente.getClientes(),
        await mangmasterGcliente.getClientes(),
        await alphaflexGcliente.getClientes()
    ];
    var clienteLen = [
        await fortyflexGcliente.getClientesLenth(),
        await brysaflexGcliente.getClientesLenth(),
        await fortyvinilGcliente.getClientesLenth(),
        await mangmasterGcliente.getClientesLenth(),
        await alphaflexGcliente.getClientesLenth()
    ];
    var clientTree = new BinaryTreeSearch();
    for (let z = 0; z < clienteLen.length; z++) {
        for (let i = 0; i <= clienteLen[z] - 1; i++) {
            var cliente = clientes[z][i];
            clientTree.insertClienteIntoTree(cliente);
        }
    }
    r = [];
    clientstreeArray = clientTree.toArray();
    for (let i = 0; i < clientstreeArray.length; i++) {
        r[i] = {
            'NOME': clientstreeArray[i].NOME,
            'CNPJ': clientstreeArray[i].CNPJCPF,
            'PESSOA': clientstreeArray[i].PESSOA,
            'ENDERECO': clientstreeArray[i].ENDERECO,
            'FILIAIS': clientstreeArray[i].FILIAL
        }
    }
    if (orderBy == "CNPJ"){
        r.sort((a, b) => parseInt(a.CNPJ) - parseInt(b.CNPJ));
    }
    else if (orderBy == "NOME"){
        r.sort((a, b) => {
            const nameA = a.NOME.toUpperCase(); // ignore upper and lowercase
            const nameB = b.NOME.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
    }

    return r;
}


async function getClientes(token, orderBy, callback) {
    let userToken = tokens.getTokenObjectByToken(token);
    tokens.removeExpiredUserToken(userToken.user);
    if (userToken.token != token || !userToken.auth.includes('clientes')){
        callback({ err: 'erro, usuário não autorizado!' }, []);
        return 0;
    }
    var c = await todosClientes(orderBy);
    console.log('clientes carregados');
    if (!r) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { data: c });
    }
}

module.exports = getClientes;