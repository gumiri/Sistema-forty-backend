const dbAccess = require('../dbAccess/dbAccess')
const options = require('../../config/firebirdConf');
const db = options.htdUnificado;

async function insertUniDate(timeStamp) {
    ssql = `INSERT INTO UNIDATE VALUES ('${timeStamp}')`;
    try {
        await dbAccess(ssql, db);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getLastUniDate() {
    try {
        r = await dbAccess(`SELECT MAX(TIMESTMP) FROM UNIDATE`, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function insertCliente(values) {
    try {
        await dbAccess(`INSERT INTO GCLIENTE VALUES (${values})`, db);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function insertTimeStamp(timeStamp) {
    ssql = `INSERT INTO DBUPDATETIME VALUES ('${timeStamp}')`;
    try {
        await dbAccess(ssql, db);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getLastTimeStamp() {
    try {
        r = await dbAccess(`SELECT MAX(TIMESTMP) FROM DBUPDATETIME`, db);
        return r;
    }
    catch (e) {
        console.log(e);
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

module.exports = { 
    insertCliente, 
    getClientes, 
    getClientesLenth, 
    insertTimeStamp, 
    getLastTimeStamp, 
    getLastCodigouni,
    getClientesPDate,
    insertUniDate,
    getLastUniDate
};