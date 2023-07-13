const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.fortyvinil;

async function getMPAlmo() {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.DES, r.DESNF, r.UNI
        FROM MPALMO r
        where r.GRU1 = 10 or r.GRU1 = 15
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getMPAlmo };