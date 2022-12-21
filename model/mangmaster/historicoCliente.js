const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.mangmaster;

async function getHistoricoCliente(cpfCliente, dtHoje, qtdRegistros) {
    try {
        r = await dbAccess(`
        SELECT first (${qtdRegistros}) r.ST, g.NOME, g.CNPJCPF, r.CODIV, r.ESPE, r.SERIE, r.NRTIT, 
        r.SEQ, c.DTVEN, r.DTMOV, r.DTREC, r.VLR, r.VLRPAGO, c.SALDO AS DIVIDA, r.PED, r.OBS, 'MANGMASTER' AS FILIAL
        FROM CRBAI r
        inner join ctrec c on (c.codi = r.CODIREC)
        inner join gcliente g on (r.codic = g.CODIGO)
        where g.cnpjcpf = ${cpfCliente} and r.DTREC < '${dtHoje}'
        order by r.DTREC desc`, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getHistoricoCliente };