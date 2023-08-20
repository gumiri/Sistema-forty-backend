const fortyflexGcliente = require('./fortyflex/gcliente');
const brysaflexGcliente = require('./brysaflex/gcliente');
const fortyvinilGcliente = require('./fortyvinil/gcliente');
const mangmasterGcliente = require('./mangmaster/gcliente');
const alphaflexGcliente = require('./alphaflex/gcliente');

const fortyflexCtrec = require('./fortyflex/contasReceber');
const alphaflexCtrec = require('./alphaflex/contasReceber');
const fortyvinilCtrec = require('./fortyvinil/contasReceber');
const brysaflexCtrec = require('./brysaflex/contasReceber');
const mangmasterCtrec = require('./mangmaster/contasReceber');
const { BinaryTreeSearch } = require('./clientTree');

const tokens = require('./auth/tokens');


today = new Date();

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

async function todosCtrecs(date1, date2) {
    var ctRecs = [
        await fortyflexCtrec.getCtrecDate(date1, date2),
        await alphaflexCtrec.getCtrecDate(date1, date2),
        await brysaflexCtrec.getCtrecDate(date1, date2),
        await fortyvinilCtrec.getCtrecDate(date1, date2),
        await mangmasterCtrec.getCtrecDate(date1, date2)
    ]
    var ctRecsLen = [
        await fortyflexCtrec.getCtrecLenthDateAberto(date1, date2),
        await alphaflexCtrec.getCtrecLenthDateAberto(date1, date2),
        await brysaflexCtrec.getCtrecLenthDateAberto(date1, date2),
        await fortyvinilCtrec.getCtrecLenthDateAberto(date1, date2),
        await mangmasterCtrec.getCtrecLenthDate(date1, date2),
    ]
    //var totalCtRecsLen = 0;
    //ctRecsLen.forEach(len => totalCtRecsLen += len);
    var count = 0;
    var tCtrecs = [];
    for (let z = 0; z < ctRecsLen.length; z++) {
        for (let i = 0; i <= ctRecsLen[z] - 1; i++) {
            var ctRec = ctRecs[z][i];
            tCtrecs[count] = ctRec;
            count += 1;
        }
    }
    return tCtrecs;
}

async function todosClientes() {
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
    //var totalClientesLen = 0;
    //clienteLen.forEach(len => totalClientesLen += len);
    //var count = 0;
    var clientTree = new BinaryTreeSearch();
    for (let z = 0; z < clienteLen.length; z++) {
        for (let i = 0; i <= clienteLen[z] - 1; i++) {
            var cliente = clientes[z][i];
            clientTree.insertClienteIntoTree(cliente);
            //count += 1;
        }
    }
    return clientTree;
}

function contasReceber(ctrec, gcliente, orderBy, dtvenc) {
    var result = [];
    var cont = 0;
    for (let i = 0; i < ctrec.length; i++) {
        if (ctrec[i].DTVEN >= dtvenc) {
            cont += 1;
            if (ctrec[i].ST == 'A   ') {
                let cliente = gcliente.treeSearch(ctrec[i]);
                let conta = {
                    'CNPJ': cliente.CNPJCPF,
                    'NOME': cliente.NOME,
                    'FILIAIS': cliente.FILIAL,
                    'SALDO': ctrec[i].SALDO,
                    'FILIAL': ctrec[i].FILIAL,
                    'DTVEN': ctrec[i].DTVEN,
                    'DTEMI': ctrec[i].DTEMI,
                    'ATRASO': Math.floor(diasDeAtraso(ctrec[i].DTVEN, today)),
                    'ESPE': ctrec[i].ESPE,
                    'SERIE': ctrec[i].SERIE,
                    'NRTIT': ctrec[i].NRTIT,
                    'SEQ': ctrec[i].SEQ,
                    'CODIP': ctrec[i].CODIP,
                    'TITPOR': ctrec[i].TITPOR,
                    'ST': ctrec[i].ST
                }
                result.unshift(conta);
            }
        }
    }
    if (orderBy == "CNPJ"){
        result.sort((a, b) => parseInt(a.CNPJ) - parseInt(b.CNPJ));
    }
    else if (orderBy == "NOME"){
        result.sort((a, b) => {
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
    return result;
}

async function getCtrecModel(date1, date2, token, orderBy, callback) {
    let userToken = tokens.getTokenObjectByToken(token);
    tokens.removeExpiredUserToken(userToken.user);
    if (userToken.token != token || !userToken.auth.includes('contas-a-receber')){
        callback({ err: 'erro, usuário não autorizado!' }, []);
        return 0;
    }
    var date1 = `${date1}`;
    date1 = date1.substring(0, 4) + '.' + date1.substring(4, 6) + '.' + date1.substring(6, 8);
    var date2 = `${date2}`;
    date2 = date2.substring(0, 4) + '.' + date2.substring(4, 6) + '.' + date2.substring(6, 8);
    var r = await todosCtrecs(date1, date2);
    var c = await todosClientes();
    var dt = new Date(date1);
    receber = contasReceber(r, c, orderBy, dt)
    if (!r) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { data: receber });
    }
}

module.exports = getCtrecModel;