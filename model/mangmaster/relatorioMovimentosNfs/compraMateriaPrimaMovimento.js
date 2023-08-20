const dbAccess = require('../../dbAccess/dbAccess');
const options = require('../../../config/firebirdConf');
const db = options.mangmaster;

async function getCompras(dt1, dt2) {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.CODINF, f.NRDOC, f.DTEMI, g.FANTASIA, r.SEQ, r.CODIITEPED, r.ITSERV, r.CODIALMO,
        r.DESCITEM, r.QT, r.VLRLIQ
        FROM FTNFITENT r
        inner join MPALMO a on (a.CODI = r.CODIALMO)
        inner join FTNFENT f on (f.CODI = r.CODINF)
        inner join GFORN g on (f.CODIFOR = g.CODIGO)
        where (f.DTEMI >= '${dt1}' and f.DTEMI <= '${dt2}') and (a.GRU1 = 24)
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getCompras };