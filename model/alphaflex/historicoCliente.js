const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.alphaflex;

async function getHistoricoCliente(cnpjCliente, dtHoje, qtdRegistros) {
    try {
        r = await dbAccess(`
        SELECT first (${qtdRegistros}) r.ST, g.NOME, g.CNPJCPF, r.CODIV, r.ESPE, r.SERIE, r.NRTIT, 
        r.SEQ, c.DTVEN, r.DTMOV, r.DTREC, r.VLR, r.VLRPAGO, c.SALDO AS DIVIDA, r.PED, r.OBS, 'ALPHAFLEX' AS FILIAL
        FROM CRBAI r
        inner join ctrec c on (c.codi = r.CODIREC)
        inner join gcliente g on (r.codic = g.CODIGO)
        where g.cnpjcpf = ${cnpjCliente} and r.DTREC < '${dtHoje}'
        order by r.DTREC desc`, db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = { getHistoricoCliente };