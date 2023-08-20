const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.mangmaster;

async function getAlmo() {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.DES, r.DESNF, r.UNI
        FROM MPALMO r
        where r.GRU1 >= 2 and r.GRU1 <= 5
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getAlmo };