const firebird = require('node-firebird');


async function dbAccess(ssql, options) {
    return new Promise((resolve, reject) => {
        firebird.attach(options, function (err,db) {
            if (err) {      
                return reject(err);
            }
            else {
                db.query(ssql, function (err, result) {
                    if (err) {
                        db.detach();
                        return reject(err);
                    }
                    else {
                        db.detach();
                        return resolve(result);
                    }
                    
                });
            }
        })
    })

}

module.exports = dbAccess;