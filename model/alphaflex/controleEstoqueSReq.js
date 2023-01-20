const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.alphaflex;

async function getEntradaSaida(dtmov) {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.MV, a.DES, a.GRU1, r.DTMOV,
        r.DTDOC, r.QT, r.VLR, r.TPES, r.PROGRAMA, 'ALPHAFLEX' as FILIAL, r.HR, r.CODIALMO,
        m.CODIMPCC, c.DES
        FROM MPKARDEX r
        inner join MPALMO a on (a.CODI = r.CODIALMO)
        inner join MPREQ m on (m.CODI = r.NRDOC)
        inner join MPCC c on (c.CODI = m.CODIMPCC)
        where (a.GRU1 >= 6 and a.GRU1 <= 12) and r.DTMOV > '${dtmov}' and r.MV = 55
        order by r.DTMOV desc
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getEntradaSaida };