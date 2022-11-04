const htdUnificado = require('./htd_clientes/gcliente');
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


function treeSearch(value, tree) {
    if (parseInt(value) > parseInt(tree.value.CNPJCPF)) {
        return treeSearch(value, tree.right);
    }
    else if (parseInt(value) < parseInt(tree.value.CNPJCPF)) {
        return treeSearch(value, tree.left);
    }
    else {
        return tree.value;
    }
}

function removeLeaf(raiz) {
    if (raiz.left.value == null && raiz.right.value == null) {
        aux = raiz;
        raiz = null;
        return aux;
    }
    else {
        console.log("Erro, arvore vazia");
        return -999999999999999;
    }
}

function removeOneChild(raiz) {
    if (raiz.right == null) {
        let aux = raiz.left;
        raiz = raiz.left;
        return aux;
    }
    else if (raiz.left == null) {
        let aux = raix.right;
        raiz = raiz.right;
        return aux;
    }
    else {
        console.log("nó não tem somente 1 filho")
        return -999999999999999;
    }
}

function lowestRightSubtree(raiz) {
    if (raiz.left.value != null && raiz.right.value != null) {
        aux = raiz.right;
        while (aux.left.value != null) {
            aux = aux.left;
        }
        console.log(aux.value.CNPJCPF);
        return aux;
    }
    else {
        console.log("Erro, nó raiz não tem dois filhos");
        return -999999999999999;
    }
}

function removeNode(raiz, value) {
    if (raiz.value != null) {
        if (value > parseInt(raiz.value.CNPJCPF)) {
            removeNode(raiz.right, value);
        }
        else if (value < parseInt(raiz.value.CNPJCPF)) {
            removeNode(raiz.left, value);
        }
        else {
            console.log("Achou o valor");
            if (raiz.left.value == null && raiz.right.value == null) {
                let r = removeLeaf(raiz);
                return r;
            }
            else if (raiz.left.value == null || raiz.value == null){
                return removeOneChild(raiz);
            }
            else{
                let aux = lowestRightSubtree(raiz);
                let aux2 = raiz;
                raiz.value = aux.value;
                aux = aux.right;
                return aux2;
            }
        }
    }
    else {
        console.log("Valor não encontrado na Árvore");
        console.log(raiz);
        return -999999999999999;
    }

}

async function todosCtrecs() {
    var ctRecs = [
        await fortyflexCtrec.getCtrec(),
        await alphaflexCtrec.getCtrec(),
        await brysaflexCtrec.getCtrec(),
        await fortyvinilCtrec.getCtrec(),
        await mangmasterCtrec.getCtrec()
    ]
    var ctRecsLen = [
        await fortyflexCtrec.getCtrecLenth(),
        await alphaflexCtrec.getCtrecLenth(),
        await brysaflexCtrec.getCtrecLenth(),
        await fortyvinilCtrec.getCtrecLenth(),
        await mangmasterCtrec.getCtrecLenth(),
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
    var tclientes = {};
    for (let z = 0; z < clienteLen.length; z++) {
        for (let i = 1; i <= clienteLen[z] - 1; i++) {
            var cliente = clientes[z][i];
            cliente.CODIGOUNI = codigouni;
            insertClienteIntoTree(tclientes, cliente);
            codigouni += 1;
        }
    }
    return tclientes;
}


async function unificarClientes(tClientes) {
    if (!tClientes) {
        return;
    }
    else {

    }
}



function contasReceber(ctrec, gcliente, dtvenc) {
    //var clientes = [];
    //var contas = [];
    var result = [];
    /*
    for (let i = 0; i < gcliente.length; i++) {
        let cliente = {
            'CNPJ': gcliente[i].CNPJCPF,
            'FILIAIS': gcliente[i].FILIAL
        };
        clientes.unshift(cliente);
    }
    for (let i = 0; i < ctrec.length; i++) {
        if (ctrec[i].DTVEN >= dtvenc) {
            if (ctrec[i].ST == 'A   ') {
                let conta = {
                    'SALDO': ctrec[i].SALDO,
                    'FILIAL': ctrec[i].FILIAL,
                    'DTVEN': ctrec[i].DTVEN,
                    'DTEMI': ctrec[i].DTEMI,
                    'CNPJ': ctrec[i].CNPJCPF,
                }
                contas.unshift(conta);
            }
        }
    }
    */
    var cont = 0
    for (let i = 0; i < ctrec.length; i++) {
        if (ctrec[i].DTVEN >= dtvenc) {
            cont += 1;
            if (ctrec[i].ST == 'A   ') {
                let cliente = treeSearch(ctrec[i].CNPJCPF, gcliente);
                let conta = {
                    'CNPJ': cliente.CNPJCPF,
                    'FILIAIS': cliente.FILIAL,
                    'SALDO': ctrec[i].SALDO,
                    'FILIAL': ctrec[i].FILIAL,
                    'DTVEN': ctrec[i].DTVEN,
                    'DTEMI': ctrec[i].DTEMI,
                }
                result.unshift(conta);
            }
        }
    }
    return result;
}

async function unificarGcliente(callback) {
    //var r = await todosCtrecs();
    //console.log('ctrec carregados');
    var c = await todosClientes();
    console.log('clientes carregados');
    removeNode(c,11725305000187);
    removeNode(c,11725305000187);
    console.log(removeNode(c,11725305000187));
    var dtven = new Date('2022.10.10');
    //receber = contasReceber(r, c, dtven)
    if (!r) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { receber });
    }
}

module.exports = unificarGcliente;