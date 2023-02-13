const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.mangmaster;

async function getEntradaSaida(dtLimite) {
    try {
        r = await dbAccess(`
        SELECT r.RDB$DB_KEY, r.CODI, r.ITEM, a.DES, r.CODIMPLOTE, r.USU, r.HR, r.PROGRAMA,
        r.QT, r.TPLAN, r.ES, r.DT, r.MPLOTE_QTATU, r.MPLOTE_QTENT, r.MPLOTE_QTSAI
        FROM LOGESTOQUE r
        inner join MPALMO a on (a.CODI = r.ITEM)
        where (a.GRU1 >= 1 and a.GRU1 <= 25) and r.DT <= '${dtLimite}'
        order by r.DT desc
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getEntradaSaida };