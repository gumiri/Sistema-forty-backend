const forty = require('./fortyflex/cliRecebAbertoForty');
const brysa = require('./brysaflex/cliRecebAbertoBrysa');
r = {};
forty(function(err,result){
    if (err){
        throw err;
    }
    else{
        r.fortyflex = result;
    }
});
brysa(function(err,result){
    if (err){
        throw err;
    }
    else{
        r.brysaflex = result;
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