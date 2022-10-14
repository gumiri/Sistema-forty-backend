const fortyflex = require('./fortyflex/fortyflex');
const alphaflex = require('./alphaflex/alphaflex');
const fortyvinil = require('./fortyvinil/fortyvinil');
const brysaflex = require('./brysaflex/brysaflex');
const mangmaster = require('./mangmaster/mangmaster');
const htdUnificado = require('./htd_clientes/htdUnificado');

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


async function criarHtdUnificado(callback) {
    date = await htdUnificado.getLastTimeStamp();
    date = date[0].MAX;

    if (date == null) {
        await htdUnificado.insertTimeStamp("01.01.2012");
        date = await htdUnificado.getLastTimeStamp();
        date = date[0].MAX;
    }
    else if (date == false) {
        callback({ err: 'não foi possíver ler ultima inserção' }, []);
        return;
    }
    date = dateToString(date)

    var clientes = [
        await fortyflex.getClientes(date),
        await brysaflex.getClientes(date),
        await fortyvinil.getClientes(date),
        await mangmaster.getClientes(date),
        await alphaflex.getClientes(date)
    ];
    var clienteLen = [
        await fortyflex.getClientesLenthDate(date),
        await brysaflex.getClientesLenthDate(date),
        await fortyvinil.getClientesLenthDate(date),
        await mangmaster.getClientesLenthDate(date),
        await alphaflex.getClientesLenthDate(date)
    ];
    var totalClientesLen = 0;
    clienteLen.forEach( len => totalClientesLen += len);

    var falha = 0;
    var count = await htdUnificado.getLastCodigouni();
    count = (count ? count[0].MAX + 1 : 1);
    console.log(count);

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
            cliente = await htdUnificado.insertCliente(cliente);
            if (!cliente) {
                falha += 1;
            }
            count += 1;
        }
    }

    var hoje = new Date();
    hoje = dateToString(hoje);
    if (hoje != date && falha <= 0) {
        await htdUnificado.insertTimeStamp(`${hoje}`);
    }
    callback(undefined, { 
        message: `Inserido ${totalClientesLen - falha} clientes com sucesso! Erro ao inserir ${falha} clientes` 
    });
    return;
}

module.exports = criarHtdUnificado;