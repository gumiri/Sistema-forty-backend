const firebird = require('node-firebird');
const options = require('../../config/firebirdConf');

function query(callback) {
    firebird.attach(options.brysaflex, function (err, db) {

        if (err) {
            return callback(err, []);
        }
        else {
            // db = DATABASE
            db.query(
                `select cliente.cnpjcpf, cliente.nome, receber.st, receber.vlr, receber.saldo, receber.dtven
            from CTREC as receber
            inner join GCLIENTE as cliente on (receber.codic = cliente.codigo)
            where receber.st = 'A' and (receber.dtven >= '2019-01-01' and receber.dtven <= '2022.09.22')`,
                function (err, result) {
                    // IMPORTANT: close the connection


                    db.detach();

                    if (err) {
                        return callback(err, []);
                    } else {
                        return callback(undefined, result);
                    }

                });
        }

    });
}

module.exports = query;