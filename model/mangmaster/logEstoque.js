const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.mangmaster;

async function getEntradaSaida(dt) {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.ITEM, r.CODIMPLOTE, a.DES, a.GRU1, r.USU, r.HR, r.PROGRAMA,
        r.QT, r.TPLAN, r.ES, r.DT, r.MPLOTE_QTATU, r.MPLOTE_QTENT, r.MPLOTE_QTSAI
        FROM LOGESTOQUE r
        inner join MPALMO a on (a.CODI = r.ITEM)
        where ((a.GRU1 >= 8 and a.GRU1 <= 11) or a.GRU1 = 13 or a.GRU1 = 19 or a.GRU1 = 20 or a.GRU1 = 22) and r.DT >= '${dt}'
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