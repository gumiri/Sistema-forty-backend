var needUserPermission = false;

const fs = require('fs');
const path = require('path');
const getComissao = require('./comissaoRepresentante');
const xlsxTemplate = require('xlsx-template');
const tamplatePath = path.join(__dirname, 'templates', 'template1.xlsx');


const tokens = require('../../auth/tokens');
const { application } = require('express');

dateToString = function (date) {
    if (date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [(dd > 9 ? '' : '0') + dd + '.',
        (mm > 9 ? '' : '0') + mm + '.',
        date.getFullYear()
        ].join('');
    }
    else {
        return null;
    }
};

function exportToXlsx(titulo) {
    return new Promise((resolve, reject) => {
        fs.readFile(tamplatePath, function (err, data) {
            if (err) {
                return reject(err);
            }
            else {
                let template = new xlsxTemplate(data);
                let sheetNumber = 1;

                let values = {
                    TITULO: titulo,
                };


                template.substitute(sheetNumber, values);

                let file = template.generate(); //{type: 'uint8array'}
                
                fs.writeFile(path.join(__dirname, 'templates', 'output1.xlsx'), file, function (err){
                    if (err) return console.log(err);
                });

                return resolve(file);
            }




        });
    })

}

async function loadEstoque(dt1, dt2) {
    let r = [];
    let comissao = await getComissao.getVendas(dt1, dt2);

    for (let i = 0; i < comissao.length; i++){
        let dtemi = comissao[i]['DTEMI'];
        let dtven = comissao[i]['DTVEN'];
        let dtrec = comissao[i]['DTREC'];
        let cliente = comissao[i]['NOME'];
        let titulo = comissao[i]['ESPE'] + comissao[i]['NRTIT'] + ' ' + comissao[i]['SEQ'];
        let vlrpago = comissao[i]['VLRPAGO'];
        let bcomi = (comissao[i]['BCOMI'] == 0? Math.round(((comissao[i]['VLRPAGO'] / comissao[i]['TOTLIQ']) * comissao[i]['TOTBRU']) * 100) / 100: comissao[i]['BCOMI']);
        let pcomivr = comissao[i]['PCOMIVR'];
        let vlrcomir = Math.round(((comissao[i]['PCOMIVR'] / 100) * bcomi) * 100) / 100;
        let pcomi = comissao[i]['PCOMI'];
        let vlrcomiv = Math.round(((comissao[i]['PCOMI'] / 100) * bcomi) * 100) / 100;
        let vendedor = (comissao[i]['CODIVI'] == 11? comissao[i]['REPRESENTANTE'] : comissao[i]['VENDEDOR']);
        let data = {
            'DTEMI': dtemi,
            'DTVEN': dtven,
            'DTREC': dtrec,
            'CLIENTE': cliente,
            'TITULO': titulo,
            'VLRPAGO': vlrpago,
            'BCOMI': bcomi,
            'PCOMIVR': pcomivr,
            'VLRCOMIR': vlrcomir,
            'PCOMI': pcomi,
            'VLRCOMIV': vlrcomiv,
            'VENDEDOR': vendedor
        }

        r.push(data);
    }
    
    return {r};
}

async function getEstoque(token, date1, date2, callback) {
    if (needUserPermission) {
        if (token) {
            let userToken = tokens.getTokenObjectByToken(token);
            tokens.removeExpiredUserToken(userToken.user);
            if (userToken.token != token || !userToken.auth.includes('materia-prima')) {
                callback({ err: 'erro, usuário não autorizado' }, []);
                return 0;
            }
        }
        else {
            callback({ err: 'erro, usuário não autorizado' }, []);
            return 0;
        }
    }
    const estoque = await loadEstoque(date1, date2);
    if (!estoque) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        var file = await exportToXlsx(estoque.r);
        callback(undefined, file);
    }
}

module.exports = getEstoque;