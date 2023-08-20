const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.fortyvinil;

async function getEstoque() {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.CODIALMO, a.DES, r.QTATU as qt, r.QTENT, r.QTSAI, ( r.QTATU + r.QTENT - r.QTSAI) as QTATU
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