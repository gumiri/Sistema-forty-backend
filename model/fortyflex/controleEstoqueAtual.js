const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.fortyflex;

async function getEstoque() {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.CODIALMO, a.DES, r.QTATU
        FROM MPLOTE r
        inner join MPALMO a on (a.CODI = r.CODIALMO)
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getEstoque };