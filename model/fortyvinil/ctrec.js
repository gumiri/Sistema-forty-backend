const dbAccess = require('../dbAccess/dbAccess');
const options = require('../../config/firebirdConf');
const db = options.fortyvinil;

async function getCtrecDate(date) {
    try {
        r = await dbAccess(
        `select r.CODI, c.CNPJCPF, c.NOME, r.FIL, r.CODINF, r.ST, r.PARCIAL, r.ESPE, r.SERIE, r.NRTIT,
        r.SEQ, r.DTEMI, r.DTVEN, r.DTVENORI, r.CODIC, r.CODIT, r.CODIGR, r.VLR,
        r.SALDO, r.VDES, r.VINSS, r.VDES1, r.VDES2, r.VDES3, r.VDES4, r.IRRF,
        r.VISS, r.COFINS, r.PIS, r.DTDESCON, r.VDESCON, r.PMUL, r.PMOR, r.CODIV,
        r.CODIP, r.TITPOR, r.DIGPOR, r.NRREM, r.DTREM, r.INSTR1, r.INSTR2, r.BOLE,
        r.BARRAS, r.DUPL, r.PED, r.NRCODI, r.FLX, r.TPCR, r.DTMOV, r.PROTESTO,
        r.VDESPCAR, r.VDESPBAN, r.OBS, r.BCOMI, r.PCOMI, r.VCOMI, r.VCOMIGER,
        r.VDAE, r.CODIGRPS, r.CODICONTRACLI, r.PEDORI, r.CODIVE, r.CODIVR,
        r.PCOMIVE, r.PCOMIVR, r.CODIFATURA, r.VCS, r.DIGPORT, r.CODIFCONCAB,
        r.CODICCMOV, r.VDES5, r.VDES6, r.CODIFCONFAT, r.MOTICAN, r.OBSCAN,
        r.CHAVENFE, r.CODIFCONPAR, r.GERACOMPL, r.CODICXLOTE, r.CODICXMOV,
        r.DUVIDOSO, r.TPENVCOB, r.VDESCONCONCEDIDO, r.CONVENIO, r.OBS2, r.EMAIL,
        r.VLRTABCOMI, r.BOLETOESPECIAL, r.AITEMCL, r.AREF, r.ADESPNO, r.ADESPDATE,
        r.ASHIPTIT, r.ASHIPINI, r.ASHIPSUR, r.ASHIPADD1, r.ASHIPADD2, r.ASHIPADD3,
        r.ASHIPCITY, r.ASHIPCEP, r.ASHIPSTATE, r.AFULLNAME, r.AIMPBOLETO,
        r.DTENVPROTESTO, r.VLRPROTESTO, r.OBSPROTESTO, r.VMORACRESCIDO,
        r.VMULACRESCIDO, r.AALTERNCL, r.DTCAN, r.VLRACRESCIMO, r.OBSACRESCIMO,
        r.CODICXCAB, r.CALCULAMULTAMORA, r.WEBEXP, r.NRREMRETCONFENT,
        r.DTREMRETCONFENT, r.STWEB, r.CODITPAG, r.PARCIMPOSTOINDIVIDUAL, 'FORTYVINIL' AS FILIAL
        from ctrec r
        inner join GCLIENTE c
        on r.CODIC = c.CODIGO
        where r.dtven > '${date}'`, 
        db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getCtrecLenthDateAberto(date) {
    try {
        let len = await dbAccess(`select count(*) from ctrec r where dtven > '${date}'`, db);
        return len[0].COUNT;
    }
    catch (e) {
        console.log(e);
        return false;
    }

}
async function getCtrec() {
    try {
        r = await dbAccess(
        `select r.CODI, c.CNPJCPF, c.NOME, r.FIL, r.CODINF, r.ST, r.PARCIAL, r.ESPE, r.SERIE, r.NRTIT,
        r.SEQ, r.DTEMI, r.DTVEN, r.DTVENORI, r.CODIC, r.CODIT, r.CODIGR, r.VLR,
        r.SALDO, r.VDES, r.VINSS, r.VDES1, r.VDES2, r.VDES3, r.VDES4, r.IRRF,
        r.VISS, r.COFINS, r.PIS, r.DTDESCON, r.VDESCON, r.PMUL, r.PMOR, r.CODIV,
        r.CODIP, r.TITPOR, r.DIGPOR, r.NRREM, r.DTREM, r.INSTR1, r.INSTR2, r.BOLE,
        r.BARRAS, r.DUPL, r.PED, r.NRCODI, r.FLX, r.TPCR, r.DTMOV, r.PROTESTO,
        r.VDESPCAR, r.VDESPBAN, r.OBS, r.BCOMI, r.PCOMI, r.VCOMI, r.VCOMIGER,
        r.VDAE, r.CODIGRPS, r.CODICONTRACLI, r.PEDORI, r.CODIVE, r.CODIVR,
        r.PCOMIVE, r.PCOMIVR, r.CODIFATURA, r.VCS, r.DIGPORT, r.CODIFCONCAB,
        r.CODICCMOV, r.VDES5, r.VDES6, r.CODIFCONFAT, r.MOTICAN, r.OBSCAN,
        r.CHAVENFE, r.CODIFCONPAR, r.GERACOMPL, r.CODICXLOTE, r.CODICXMOV,
        r.DUVIDOSO, r.TPENVCOB, r.VDESCONCONCEDIDO, r.CONVENIO, r.OBS2, r.EMAIL,
        r.VLRTABCOMI, r.BOLETOESPECIAL, r.AITEMCL, r.AREF, r.ADESPNO, r.ADESPDATE,
        r.ASHIPTIT, r.ASHIPINI, r.ASHIPSUR, r.ASHIPADD1, r.ASHIPADD2, r.ASHIPADD3,
        r.ASHIPCITY, r.ASHIPCEP, r.ASHIPSTATE, r.AFULLNAME, r.AIMPBOLETO,
        r.DTENVPROTESTO, r.VLRPROTESTO, r.OBSPROTESTO, r.VMORACRESCIDO,
        r.VMULACRESCIDO, r.AALTERNCL, r.DTCAN, r.VLRACRESCIMO, r.OBSACRESCIMO,
        r.CODICXCAB, r.CALCULAMULTAMORA, r.WEBEXP, r.NRREMRETCONFENT,
        r.DTREMRETCONFENT, r.STWEB, r.CODITPAG, r.PARCIMPOSTOINDIVIDUAL, 'FORTYVINIL' AS FILIAL
        from ctrec r
        inner join GCLIENTE c
        on r.CODIC = c.CODIGO`, 
        db);
        return r;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
async function getCtrecLenth() {
    try {
        let len = await dbAccess(`select count(*) from ctrec`, db);
        return len[0].COUNT;
    }
    catch (e) {
        console.log(e);
        return false;
    }

}
module.exports = { getCtrecDate, getCtrecLenthDateAberto, getCtrec, getCtrecLenth };