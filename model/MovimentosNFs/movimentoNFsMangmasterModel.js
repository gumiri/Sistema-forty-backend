var needUserPermission = true;

const tokens = require('../auth/tokens');
const mapMangueiras = require('./mapaPcParaMetrosMangmaster.json');
const vendasAlphaflex = require('../mangmaster/relatorioMovimentosNfs/vendasMovimentosNf');
const comprasAlphaflex = require('../mangmaster/relatorioMovimentosNfs/compraMateriaPrimaMovimento');
const fs = require('fs');
const path = require('path');
const xlsxTemplate = require('xlsx-template');
const tamplatePath = path.join(__dirname, 'templates', 'template1.xlsx');


dateToString = function (date) {
    if (date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [(dd > 9 ? '' : '0') + dd + '/',
        (mm > 9 ? '' : '0') + mm + '/',
        date.getFullYear()
        ].join('');
    }
    else {
        return null;
    }
};

function exportToXlsx(compras, vendas, total, obs) {
    return new Promise((resolve, reject) => {
        fs.readFile(tamplatePath, function (err, data) {
            if (err) {
                return reject(err);
            }
            else {
                let template = new xlsxTemplate(data);
                let sheetNumber = 1;

                let values = {
                    COMPRAS: compras,
                    VENDAS: vendas,
                    TOTAL: total,
                    OBSERVACAO: obs
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

    let comprasAlpha = await comprasAlphaflex.getCompras(dt1, dt2);
    let vendasAlpha = await vendasAlphaflex.getVendas(dt1, dt2);
    let totalValor = 0;
    let totalMetros = 0;
    let totalKgs = 0;
    let totalIpi = 0;
    let totalIcm = 0;

    let r = {
        'COMPRAS': [],
        'VENDAS': [],
        'TOTAL': [],
        'OBSERVACAO': []
    };

    for (let i = 0; i < vendasAlpha.length; i++) {
        let venda = vendasAlpha[i];
        if (venda['ST'] != 'C   ' && venda['CFOPS'] != 2.201 && venda['CODIGNAT'] != 52 && venda['CODIGNAT'] != 28 && venda['CODIGNAT'] != 50 &&/* venda['CODIGNAT'] != 57 &&*/ venda['CODIGNAT'] != 59 && venda['CODIP'] != null /*&& venda['IMP'] != 'S   '*/) {
            let metros = venda['QT'];

            if (venda['UNI'] == 'PC' || venda['UNI'] == 'PCT' || venda['UNI'] == 'UNI' || venda['UNI'] == 'UNID') {
                for (let z = 0; z < mapMangueiras.length; z++) {
                    if (venda['CODIALMO'] == mapMangueiras[z]['CODI']) {
                        metros = venda['QT'] * mapMangueiras[z]['QTD'];
                    }
                }
            }
            let kg = metros / 4;
            let vlrPorMetro = venda['VLRUNI'];
            if (kg / 25 - Math.floor(kg / 25) != 0) {
                kg = Math.round(kg / 25) * 25;
            }
            if (kg <= 25) {
                kg = 25;
            }
            if (venda['GRU1'] != 2 && venda['GRU1'] != 3 && venda['GRU1'] != 4 && venda['GRU1'] != 5) {
                kg = 0;
                metros = 0;
                vlrPorMetro = 0;
                continue;
            }
            let dtdoc = venda['DTDOC'];
            dtdoc = dateToString(dtdoc);

            let data = {
                'COD': venda['CODIALMO'],
                'NRNOTA': venda.NRDOC,
                'DATA': dtdoc,
                'DES': venda.DES,
                'KG': kg,
                'METROS': metros,
                'VLRPMETRO': vlrPorMetro,
                'VALORNF': venda['VLR']
            }
            totalValor += venda['VLR'];
            totalMetros += metros;
            totalKgs += kg;
            totalIpi += venda['VIPI'];
            totalIcm += venda['VICM'];
            r['VENDAS'].push(data);
        }
        else if (venda['CFOPS'] == 2.201) {
            let data = {
                'NOTA': venda['NRDOC'],
                'VLORNF': venda['VLR']
            }
            r['OBSERVACAO'].push(data);
        }
    }
    r['TOTAL'].push({
        'TOTALKG': totalKgs,
        'TOTALMETROS': totalMetros,
        'TOTALVALOR': totalValor,
        'TOTALICMS': totalIcm,
        'TOTALIPI': totalIpi
    });
    for (let i = 0; i < comprasAlpha.length; i++) {
        let compra = comprasAlpha[i];
        let kg = compra['QT'];
        //kg / 25 - Math.floor(kg / 25) != 0
        let metros = kg * 4;
        let vlrUnit = compra['VLRLIQ'] / kg;
        let dtNf = compra['DTEMI'];
        dtNf = dateToString(dtNf);

        let data = {
            'FORNECEDOR': compra['FANTASIA'],
            'NF': compra['NRDOC'],
            'DATANF': dtNf,
            'DESCRICAO': compra['DESCITEM'],
            'KG': kg,
            'METROS': metros,
            'VLRUNIT': vlrUnit,
            'VALOR': compra['VLRLIQ']
        }
        r['COMPRAS'].push(data);
    }
    r['VENDAS'] = juntarPorTipoMang(r['VENDAS']);
    r['TOTAL'] = [];
    return r;
}

function juntarPorTipoMang(listMang) {
    let r = [];
    let isInArr = false;
    for (let i = 0; i < listMang.length; i++) {
        for (let z = 0; z < r.length; z++) {
            if (listMang[i]['COD'] == r[z]['COD']) {
                r[z]['KG'] += listMang[i]['KG'];
                r[z]['METROS'] += listMang[i]['METROS'];
                r[z]['VALORNF'] += listMang[i]['VALORNF'];
                isInArr = true;
            }
        }
        if (!isInArr) {
            listMang[i]['NRNOTA'] = '-';
            listMang[i]['DATA'] = '-';
            r.push(listMang[i]);
        }
        isInArr = false;

    }
    for (let i = 0; i < r.length; i++) {
        r[i]['VLRPMETRO'] = r[i]['VALORNF'] / r[i]['METROS'];
    }
    return r;
}




async function getEstoque(token, date1, date2, callback) {
    if (needUserPermission) {
        if (token) {
            let userToken = tokens.getTokenObjectByToken(token);
            tokens.removeExpiredUserToken(userToken.user);
            if (userToken.token != token || !userToken.auth.includes('movimentos')) {
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
        var file = await exportToXlsx(estoque.COMPRAS, estoque.VENDAS, estoque.TOTAL, estoque.OBSERVACAO);
        callback(undefined, file);
    }
}

module.exports = getEstoque;