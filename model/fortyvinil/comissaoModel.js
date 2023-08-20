var needUserPermission = false;

const fs = require('fs');
const path = require('path');

const vendedorFilial = require('./mapVendedorFilial.json');

const getComissao = require('./comissao');
const xlsxTemplate = require('xlsx-template');
const tamplatePath = path.join(__dirname, 'templates', 'template1.xlsx');


const tokens = require('../auth/tokens');
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

function exportToXlsx(nf, ntDesconto) {
    return new Promise((resolve, reject) => {
        fs.readFile(tamplatePath, function (err, data) {
            if (err) {
                return reject(err);
            }
            else {
                let template = new xlsxTemplate(data);
                let sheetNumber = 1;

                let values = {
                    NF: nf,
                    NTDESCONTO: ntDesconto
                };


                template.substitute(sheetNumber, values);

                let file = template.generate(); //{type: 'uint8array'}
                /*
                fs.writeFile(path.join(__dirname, 'templates', 'output1.xlsx'), file, function (err){
                    if (err) return console.log(err);
                });*/

                return resolve(file);
            }




        });
    })

}

async function loadEstoque(dt1, dt2) {
    let r = [];
    let comissao = await getComissao.getVendas(dt1, dt2);
    let ntDesconto = [];
    
    for (let i = 0; i < comissao.length; i++){
        if (comissao[i]['ST'] == 'C   '){
            continue;
        }
        
        if (comissao[i]['PDES'] > 0 && comissao[i]['ORI'] != 51 && comissao[i]['ORI'] != 1){
            let data = {
                'NT': comissao[i]['NRDOC']
            }
            ntDesconto.push(data);
        }
        let vendedor = (comissao[i]['CODV'] == 11? comissao[i]['REPRESENTANTE'] : comissao[i]['VENDEDOR']);
        let codVend = (comissao[i]['CODV'] == 11? comissao[i]['CODIREP'] : comissao[i]['CODV']);
        let totalicms = comissao[i]['VICM'];
        let totsemipi = comissao[i]['TOTBRU'];
        let totvenda = comissao[i]['TOTLIQ'];
        let fortyflex = (vendedorFilial[0][codVend] == 1? totvenda: '');
        let mangmaster = (vendedorFilial[0][codVend] == 2? totvenda: '');
        let alphaflex = (vendedorFilial[0][codVend] == 3? totvenda: '');
        let fortyvinil = (vendedorFilial[0][codVend] == 4? totvenda: '');
        if (comissao[i]['ORI'] == 51){
            totalicms = comissao[i]['VICM'] * -1;
            totsemipi = 0;
            totvenda = comissao[i]['TOTLIQ'] * -1;
        }
        else if (comissao[i]['ORI'] == 1 || comissao[i]['CFOPS'] == 6.910){
            totsemipi = 0;
            totvenda = 0;
        }
        let data = {
            'NF': comissao[i]['NRDOC'],
            'EMISSAO': comissao[i]['DT'],
            'CLIENTE': comissao[i]['FANTASIA'],
            'FORTYVINIL': fortyvinil,
            'FORTYFLEX': fortyflex,
            'ALPHAFLEX': alphaflex,
            'BRYSAFLEX': mangmaster,
            'TOTVENDA': totvenda,
            'VENDEDOR': vendedor,
            'TOTSEMIPI': totsemipi,
            'TOTALICMS': totalicms
        }
        r.push(data);
    }
    return {r, ntDesconto};
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
        var file = await exportToXlsx(estoque.r, estoque.ntDesconto);
        callback(undefined, file);
    }
}

module.exports = getEstoque;