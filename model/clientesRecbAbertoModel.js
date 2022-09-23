const forty = require('./fortyflex/cliRecebAbertoForty');
r = []

forty(function(err,result){
    if (err){
        throw err;
    }
    else{
        r = result;
    }
});

function qforty(callback){
    if (r == []){
        callback({message: "erro"}, [])
    }
    else{
        r[r.length] = r[0]
        callback(undefined, r)
    }
}

module.exports = qforty;