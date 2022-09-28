const firebird = require('node-firebird');
const options = require('../../config/firebirdConf');

function cpGcliente(timestamp, callback) {
    firebird.attach(options.fortyflex, function (err, db) {
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
                });
        }
    });
}


module.exports = cpGcliente;