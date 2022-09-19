const firebird = require('node-firebird');
const options = require('../config/firebirdCong');

function query(callback) {
    firebird.attach(options, function (err, db) {

        if (err)
            throw err;

        // db = DATABASE
        db.query('SELECT FIRST 10 * FROM PCLIENTE', function (err, result) {
            // IMPORTANT: close the connection


            db.detach();

            if (err) {
                return callback(err, []);
            } else {
                return callback(undefined, result);
            }

        });

    });
}

module.exports = query;