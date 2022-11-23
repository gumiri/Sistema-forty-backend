const fortyflexGcliente = require('./fortyflex/gcliente');
const brysaflexGcliente = require('./brysaflex/gcliente');
const fortyvinilGcliente = require('./fortyvinil/gcliente');
const mangmasterGcliente = require('./mangmaster/gcliente');
const alphaflexGcliente = require('./alphaflex/gcliente');

const fortyflexCtrec = require('./fortyflex/ctrec');
const alphaflexCtrec = require('./alphaflex/ctrec');
const fortyvinilCtrec = require('./fortyvinil/ctrec');
const brysaflexCtrec = require('./brysaflex/ctrec');
const mangmasterCtrec = require('./mangmaster/ctrec');
const { BinaryTreeSearch } = require('./clientTree');

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
    var totalCtRecsLen = 0;
    ctRecsLen.forEach(len => totalCtRecsLen += len);
    var codigouni = 1;
    var tCtrecs = [];
    for (let z = 0; z < ctRecsLen.length; z++) {
        for (let i = 1; i <= ctRecsLen[z] - 1; i++) {
            var ctRec = ctRecs[z][i];
            ctRec.CODIGOUNI = codigouni;
            tCtrecs[codigouni - 1] = ctRec;
            codigouni += 1;
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
    var totalClientesLen = 0;
    clienteLen.forEach(len => totalClientesLen += len);
    var codigouni = 1;
    var clientTree = new BinaryTreeSearch();
    for (let z = 0; z < clienteLen.length; z++) {
        for (let i = 1; i <= clienteLen[z] - 1; i++) {
            var cliente = clientes[z][i];
            cliente.CODIGOUNI = codigouni;
            clientTree.insertClienteIntoTree(cliente);
            codigouni += 1;
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
    else{
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

async function getCtrecModel(date1, date2, orderBy, callback) {
    var date1 = `${date1}`;
    date1 = date1.substring(0, 4) + '.' + date1.substring(4, 6) + '.' + date1.substring(6, 8);
    var date2 = `${date2}`;
    date2 = date2.substring(0, 4) + '.' + date2.substring(4, 6) + '.' + date2.substring(6, 8);
    console.log(date1);
    var r = await todosCtrecs(date1, date2);
    console.log('ctrec carregados');
    var c = await todosClientes();
    console.log('clientes carregados');
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