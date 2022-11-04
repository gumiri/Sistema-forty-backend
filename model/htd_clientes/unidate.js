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

module.exports = { 
    insertUniDate,
    getLastUniDate
};