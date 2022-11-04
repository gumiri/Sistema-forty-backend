const dbAccess = require('../dbAccess/dbAccess')
const options = require('../../config/firebirdConf');
const db = options.htdUnificado;

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
module.exports = { 
    getLastTimeStamp,
    insertTimeStamp
};