const fortyflexGcliente = require('./fortyflex/gcliente');
const alphaflexGcliente = require('./alphaflex/gcliente');
const fortyvinilGcliente = require('./fortyvinil/gcliente');
const brysaflexGcliente = require('./brysaflex/gcliente');
const mangmasterGcliente = require('./mangmaster/gcliente');
const htdUnificadoGcliente = require('./htd_clientes/gcliente');

const fortyflexCtrec = require('./fortyflex/ctrec');
const alphaflexCtrec = require('./alphaflex/ctrec');
const fortyvinilCtrec = require('./fortyvinil/ctrec');
const brysaflexCtrec = require('./brysaflex/ctrec');
const mangmasterCtrec = require('./mangmaster/ctrec');
const htdUnificadoCtrec = require('./htd_clientes/ctrec');

const htdUnificadoTimestamp = require('./htd_clientes/timestamp');

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

async function getLastTimestamp() {
    date = await htdUnificadoTimestamp.getLastTimeStamp();
    date = date[0].MAX;

    if (date == null) {
        await htdUnificadoTimestamp.insertTimeStamp("01.01.2008");
        date = await htdUnificadoTimestamp.getLastTimeStamp();
        date = date[0].MAX;
    }
    else if (date == false) {
        return false;
    }
    return date;
}

async function insertNewTimeStamp(date) {
    var hoje = new Date();
    hoje = dateToString(hoje);
    if (hoje != date) {
        await htdUnificadoTimestamp.insertTimeStamp(`${hoje}`);
    }
}


async function criarGcliente() {
    date = await getLastTimestamp();
    date = dateToString(date);

    var clientes = [
        await fortyflexGcliente.getClientes(date),
        await brysaflexGcliente.getClientes(date),
        await fortyvinilGcliente.getClientes(date),
        await mangmasterGcliente.getClientes(date),
        await alphaflexGcliente.getClientes(date)
    ];
    var clienteLen = [
        await fortyflexGcliente.getClientesLenthDate(date),
        await brysaflexGcliente.getClientesLenthDate(date),
        await fortyvinilGcliente.getClientesLenthDate(date),
        await mangmasterGcliente.getClientesLenthDate(date),
        await alphaflexGcliente.getClientesLenthDate(date)
    ];
    var totalClientesLen = 0;
    clienteLen.forEach(len => totalClientesLen += len);

    var falha = 0;
    let count = await htdUnificadoGcliente.getLastCodigouni();
    count = (count ? count[0].MAX + 1 : 1);

    for (let z = 0; z < clienteLen.length; z++) {
        for (let i = 1; i <= clienteLen[z] - 1; i++) {
            var cliente = clientes[z][i];
            cliente.CODIGOUNI = count;
            cliente.DTCADASTRO = dateToString(cliente.DTCADASTRO);
            cliente.DTUC = dateToString(cliente.DTUC);
            cliente.DTALTERACAO = dateToString(cliente.ALTERACAO);
            cliente.DATAHORA = dateToString(cliente.DATAHORA);
            cliente.DTPC = dateToString(cliente.DTPC);
            cliente.DTMC = dateToString(cliente.DTMC);
            cliente = JSON.stringify(Object.values(cliente));
            cliente = cliente.replace(/'/g, '');
            cliente = cliente.replace(/"/g, "'");
            cliente = cliente.replace(/\\'/g, " ");
            cliente = cliente.slice(1, cliente.length - 1);
            cliente = await htdUnificadoGcliente.insertCliente(cliente);
            if (!cliente) {
                falha += 1;
                return;
            }
            count += 1;
        }
    }
    return totalClientesLen;
}

async function criarCtrec() {
    var date = await getLastTimestamp();
    var date = dateToString(date);

    var ctRecs = [
        await fortyflexCtrec.getCtrecDate(date),
        await alphaflexCtrec.getCtrecDate(date),
        await brysaflexCtrec.getCtrecDate(date),
        await fortyvinilCtrec.getCtrecDate(date),
        await mangmasterCtrec.getCtrecDate(date)
    ]
    var ctRecsLen = [
        await fortyflexCtrec.getCtrecLenthDateAberto(date),
        await alphaflexCtrec.getCtrecLenthDateAberto(date),
        await brysaflexCtrec.getCtrecLenthDateAberto(date),
        await fortyvinilCtrec.getCtrecLenthDateAberto(date),
        await mangmasterCtrec.getCtrecLenthDateAberto(date),
    ]
    var totalCtrecs = 0;
    ctRecsLen.forEach(len => totalCtrecs += len);

    let falha = 0;
    let codiuni = await htdUnificadoCtrec.getLastCodigouni();
    codiuni = (codiuni ? codiuni[0].MAX + 1 : 1);

    for (let z = 0; z < ctRecsLen.length; z++) {
        for (let i = 1; i <= ctRecsLen[z] - 1; i++) {
            var ctrec = ctRecs[z][i];
            ctrec.CODIGOUNI = codiuni;
            ctrec.DTEMI = dateToString(ctrec.DTEMI);
            ctrec.DTVEN = dateToString(ctrec.DTVEN);
            ctrec.DTVENORI = dateToString(ctrec.DTVENORI);
            ctrec.DTMOV = dateToString(ctrec.DTMOV);
            ctrec.DTCAN = dateToString(ctrec.DTCAN);
            ctrec.DTDESCON = dateToString(ctrec.DTDESCON);
            ctrec.DTREM = dateToString(ctrec.DTREM);
            ctrec.DTENVPROTESTO = dateToString(ctrec.DTENVPROTESTO);
            ctrec.DTREMRETCONFENT = dateToString(ctrec.DTREMRETCONFENT);
            ctrec = JSON.stringify(Object.values(ctrec));
            ctrec = ctrec.replace(/'/g, '');
            ctrec = ctrec.replace(/"/g, "'");
            ctrec = ctrec.replace(/\\'/g, " ");
            ctrec = ctrec.slice(1, ctrec.length - 1);
            ctrec = await htdUnificadoCtrec.insertCtrec(ctrec);
            if (!ctrec) {
                falha += 1;
                console.log(`${z} - ${i}`)
                return;
            }
            codiuni += 1;
        }
    }

    return totalCtrecs;
}

async function criarHtdUnificado(callback) {
    console.log('importando clientes')
    var gcliente = await criarGcliente();
    console.log(`${gcliente} Clientes importado com sucesso! \nImportando Ctrecs`)
    //var ctrec = await criarCtrec();
    var ctrec = 1
    var date = new Date();
    if (!ctrec || !gcliente) {
        callback({ err: 'não foi possíver ler ultima inserção' }, []);
    }
    else {
        await insertNewTimeStamp(date);
        callback(undefined, { message: `Banco migrado com sucesso! ${gcliente} clientes migrados e ${ctrec} ctrecs migrados` });
    }
}

module.exports = criarHtdUnificado;