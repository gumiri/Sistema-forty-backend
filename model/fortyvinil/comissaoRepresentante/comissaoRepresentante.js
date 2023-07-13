const dbAccess = require('../../dbAccess/dbAccess');
const options = require('../../../config/firebirdConf');
const db = options.fortyvinil;

async function getVendas(dt1, dt2) {
    try {
        r = await dbAccess(
        `SELECT c.DTEMI, c.DTVEN, r.DTREC, g.NOME, r.ESPE, r.NRTIT, r.SERIE, 
        r.SEQ, r.VLR, r.VLRPAGO, r.VLRPAGO, x.TOTLIQ, x.TOTBRU, g.CODIVI, v.NOME VENDEDOR, g.CODIR, z.NOME REPRESENTANTE, c.PCOMIVR, c.PCOMI,
        c.BCOMI
        FROM CRBAI r
        inner join ctrec c on (c.codi = r.CODIREC)
        inner join gcliente g on (r.codic = g.CODIGO)
        left outer join GVEND v on (v.CODIGO = g.CODIVI)
        left outer join GVEND z on (z.CODIGO = g.CODIR)
        left outer join FTNF x on (x.NRDOC = c.NRTIT)
        where r.DTREC >= '${dt1}' and r.DTREC <= '${dt2}'
        order by r.DTREC asc, r.NRTIT asc`
        , db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getVendas };