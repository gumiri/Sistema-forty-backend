const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.fortyvinil;

async function getVendas(dt1, dt2) {
    try {
        r = await dbAccess(
        `SELECT r.NRDOC, g.FANTASIA, r.DT, r.NRPED, r.DTCAN, r.BICM, r.VICM, r.PDES, r.BIPI, 
        r.VIPI, v.CODIGO CODV, v.NOME VENDEDOR, c.NOME REPRESENTANTE, r.CODIREP, r.TOTBRU, 
        r.TOTLIQ, r.ST, r.BCOMI, r.PCOMI, r.VCOMI, r.ORI, r.PDES, r.CFOPS
        FROM FTNF r
        left outer join GCLIENTE g on (g.CODIGO = r.CODIC)
        left outer join GVEND v on (v.CODIGO = r.CODIV)
        left outer join GVEND c on (c.CODIGO = r.CODIREP)
        where r.dt >= '${dt1}' and r.dt <= '${dt2}'
        order by r.dt asc, r.NRDOC asc`
        , db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getVendas };