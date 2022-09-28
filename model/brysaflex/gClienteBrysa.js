const firebird = require('node-firebird');
const options = require('../../config/firebirdConf');

function gCliente(timestamp, callback) {
    firebird.attach(options.brysaflex, function (err, db) {
        if (err) {
            callback(err, []);
        }
        else {
            db.query(`
                select * from GCLIENTE
                where dtcadastro > ' ` + timestamp + `'
            `,
                function (err, result) {
                    db.detach();

                    if(err){
                        callback(err,[]);
                    }
                    else{
                        callback(undefined,result);
                    }
                });
        }
    });
}


module.exports = gCliente;