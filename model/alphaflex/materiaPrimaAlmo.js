const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.alphaflex;

async function getMPAlmo() {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.DES, r.DESNF, r.UNI
        FROM MPALMO r
        where r.GRU1 = 13
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getMPAlmo };