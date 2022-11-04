const dbAccess = require('../dbAccess/dbAccess')
const options = require('../../config/firebirdConf');
const db = options.htdUnificado;


async function insertCliente(values) {
    try {
        await dbAccess(`INSERT INTO GCLIENTE VALUES (${values})`, db);
        return true;
    }
    catch (e) {
        return false;
    }
}
async function getClientesPDate(date) {
    try {
        r = await dbAccess(`SELECT * FROM GCLIENTE WHERE DTCADASTRO > '${date}'`, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getClientesPDateLenth(date) {
    try {
        let r = await dbAccess(`SELECT COUNT(*) FROM GCLIENTE WHERE DTCADASTRO > '${date}'`, db);
        return r[0].COUNT;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getClientes() {
    try {
        r = await dbAccess(`SELECT * FROM GCLIENTE`, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getClientesLenth() {
    try {
        let r = await dbAccess(`SELECT COUNT(*) FROM GCLIENTE`, db);
        return r[0].COUNT;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getLastCodigouni() {
    try {
        r = await dbAccess(`SELECT MAX(CODIGOUNI) FROM GCLIENTE`, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function deleteWithPkey(codigouni) {
    try {
        await dbAccess(`DELETE FROM GCLIENTE WHERE CODIGOUNI = ${codigouni}`, db);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function updateClienteFilial(codigouni, filial) {
    try {
        await dbAccess(`UPDATE GCLIENTE SET FILIAL = '${filial}' WHERE CODIGOUNI = ${codigouni}`, db);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { 
    insertCliente, 
    getClientes, 
    getClientesLenth, 
    getLastCodigouni,
    getClientesPDate,
    getClientesPDateLenth,
    deleteWithPkey,
    updateClienteFilial
};