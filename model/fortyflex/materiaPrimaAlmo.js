const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.fortyflex;

async function getMPAlmo() {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.DES, r.DESNF, r.UNI
        FROM MPALMO r
        where r.GRU1 = 14
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getMPAlmo };