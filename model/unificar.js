const htdUnificado = require('./htd_clientes/htdUnificado');

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

async function unificar(callback){
    //var date = await htdUnificado.getLastUniDate();
    var r = await htdUnificado.getClientesPDate('01.01.2022');
    if(!r){
        callback({err:'erro ao ler base de dados'},[]);
    }
    else{
        callback(undefined,r);
    }
}

module.exports = unificar;