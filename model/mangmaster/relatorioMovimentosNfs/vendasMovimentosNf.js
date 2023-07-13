const dbAccess = require('../../dbAccess/dbAccess');
const options = require('../../../config/firebirdConf');
const db = options.mangmaster;

async function getVendas(dt1, dt2) {
    try {
        r = await dbAccess(`
        SELECT r.CODI, f.NRDOC, f.DT DTDOC, r.SEQ, r.ITSERV, r.CODIALMO, r.DESCITEM DES,
        r.QT, r.VLRUNI, r.CUNI UNI, r.VLRUNI, f.IMP, r.VICM, r.VIPI,
        r.VLRTOT VLR, r.PLIQ, r.CODIGNAT, a.GRU1, f.ST, f.CODIP, r.BIPI, f.CFOPS
        FROM FTNFITE r
        inner join FTNF f on (f.CODI = r.CODINF)
        inner join MPALMO a on (a.CODI = r.CODIALMO)
        where (f.DT >= '${dt1}' and f.DT <= '${dt2}') and (a.GRU1 != 24)
        order by f.DT asc, f.NRDOC asc
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getVendas };