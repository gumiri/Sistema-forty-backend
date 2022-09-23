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
        callback(undefined, r)
    }
}

module.exports = qforty;