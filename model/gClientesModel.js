const gClienteForty = require('./fortyflex/gClienteForty');
const gClienteBrysa = require('./brysaflex/gClienteBrysa');

r = {}

gClienteForty('01.01.2022', function(err,result){
    if(err){
        console.log(err);
    }
    else{
        r.fortyflex = result
    }
});
gClienteBrysa('01.01.2022', function(err,result){
    if(err){
        console.log(err);
    }
    else{
        r.brysaflex = result
    }
});


function gClienteModel(callback){
    callback(undefined,r)
}

module.exports = gClienteModel;