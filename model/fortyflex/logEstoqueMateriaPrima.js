const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.fortyflex;

async function getEntradaSaida(dt1, dt2) {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.ITEM, r.CODIMPLOTE, a.DES, a.GRU1, r.USU, r.HR, r.PROGRAMA,
        r.QT, r.TPLAN, r.ES, r.DT, r.MPLOTE_QTATU, r.MPLOTE_QTENT, r.MPLOTE_QTSAI
        FROM LOGESTOQUE r
        inner join MPALMO a on (a.CODI = r.ITEM)
        where ((a.GRU1 >= 1 and a.GRU1 <= 5) or a.GRU1 = 14 or a.GRU1 = 18) and (r.DT >= '${dt1}' and r.DT <= '${dt2}')
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