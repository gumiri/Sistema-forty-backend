const materiaPrimaES = require('./materiaPrimaES');
const mangueirasES = require('./MangueirasES');
const mapMPMang = require('./mapMateriaPrima.json');
const mapMtsMangueiras = require('./mapMangueirasMts.json')

async function mediaMPUsada(mp, dt1, dt2) {
    let mpPeriodo = [];
    let mpES = await materiaPrimaES.getEntradaSaida(dt1, dt2);
    let mangES = await mangueirasES.getEntradaSaida(dt1, dt2);

    for (let i = 0; i < mapMPMang.length; i++) {
        let data = {
            "CODIGO": mapMPMang[i]['CODIGO'],
            "COD": mapMPMang[i]['COD'],
            "DES": mapMPMang[i]['DES'],
            "MANG": mapMPMang[i]['MANG'],
            "QTMP": 0,
            "QTMANG": 0,
            "MEDIAMP": 0,
            'SALDO': 0,
            'QTMANGV': 0
        }
        mpPeriodo.push(data);
    }
    for (let i = 0; i < mpES.length; i++) {
        if (mpES[i]['TPES'] == 'S   ') {
            for (let z = 0; z < mpPeriodo.length; z++) {
                for (let x = 0; x < mpPeriodo[z]['COD'].length; x++) {
                    if (mpES[i]['CODIALMO'] == mpPeriodo[z]['COD'][x]){
                        mpPeriodo[z]['QTMP'] += mpES[i]['QT'];
                    }
                }
            }
        }
    }
    for (let i = 0; i < mangES.length; i++) {
        if (mangES[i]['TPES'] == 'E   ') {
            for (let z = 0; z < mpPeriodo.length; z++) {
                for (let x = 0; x < mpPeriodo[z]['MANG'].length; x++) {
                    if (mangES[i]['CODIALMO'] == mpPeriodo[z]['MANG'][x]){
                        let qtmang = mangES[i]['QT'];
                        for (let c = 0; c < mapMtsMangueiras.length; c++){
                            if (mangES[i]['CODIALMO'] == mapMtsMangueiras[c]['COD']){
                                qtmang = mangES[i]['QT'] * mapMtsMangueiras[c]['MT'];
                            }
                        }
                        mpPeriodo[z]['QTMANG'] += qtmang;
                    }
                }
            }
        }
    }
    for (let i = 0; i < mangES.length; i++) {
        if (mangES[i]['TPES'] == 'S   ' && mangES[i]['PROGRAMA'] == 'CadFTNF') {
            for (let z = 0; z < mpPeriodo.length; z++) {
                for (let x = 0; x < mpPeriodo[z]['MANG'].length; x++) {
                    if (mangES[i]['CODIALMO'] == mpPeriodo[z]['MANG'][x]){
                        let qtmang = mangES[i]['QT'];
                        for (let c = 0; c < mapMtsMangueiras.length; c++){
                            if (mangES[i]['CODIALMO'] == mapMtsMangueiras[c]['COD']){
                                qtmang = mangES[i]['QT'] * mapMtsMangueiras[c]['MT'];
                            }
                        }
                        mpPeriodo[z]['QTMANGV'] += qtmang;
                    }
                }
            }
        }
    }
    for (let i = 0; i < mpPeriodo.length; i++){
        mpPeriodo[i]['MEDIAMP'] = mpPeriodo[i]['QTMP'] / mpPeriodo[i]['QTMANG'];
    }
    

    return mpPeriodo;
}

module.exports = { mediaMPUsada };