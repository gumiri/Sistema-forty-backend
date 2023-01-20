const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.alphaflex;

async function getEntradaFornecedores(dtmov) {
    try {
        r = await dbAccess(`
        SELECT r.CODI, r.MV, a.DES, a.GRU1, f.NOME, r.DTMOV,
        r.DTDOC, r.QT, r.VLR, r.TPES, r.PROGRAMA, 'ALPHAFLEX' AS FILIAL, r.HR, r.CODIALMO
        FROM MPKARDEX r        
        inner join MPALMO a on (a.CODI = r.CODIALMO)
        inner join GFORN f on (r.CODIFOR = f.CODIGO)
        where (a.GRU1 >= 6 and a.GRU1 <= 12) and r.DTMOV > '${dtmov}'
        order by r.DTMOV desc
        `, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getEntradaFornecedores };