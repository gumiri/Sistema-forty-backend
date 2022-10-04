const firebird = require('node-firebird');
const options = require('../../config/firebirdConf');



function gClienteInsert (values, callback){

    firebird.attach(options.htdUnificado, function (err, db){
        if (err){
            callback(err,[]);
        }
        else{
            db.query(`
                INSERT INTO GCLIENTE VALUES (${values})
            `,
            function (err,result){
                if (err){
                    callback(err,[]);
                }
                else{
                    callback(undefined,result);
                }
            })
        }
    });
}

module.exports = gClienteInsert;