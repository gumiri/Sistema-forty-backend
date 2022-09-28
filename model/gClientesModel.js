const gClienteForty = require('./fortyflex/gClienteForty');
const gClienteBrysa = require('./brysaflex/gClienteBrysa');

r = {}



function gClienteModel(callback){
    gClienteForty('01.01.2022', function(err,result){
        if(err){
            callback(err,[]);
        }
        else{
            r.fortyflex = result
        }
    });
    gClienteBrysa('01.01.2022', function(err,result){
        if(err){
            callback(err,[]);
        }
        else{
            r.brysaflex = result
        }
    });
    
}

module.exports = gClienteModel;