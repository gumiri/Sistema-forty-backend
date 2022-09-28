const forty = require('./fortyflex/cliRecebAbertoForty');
const brysa = require('./brysaflex/cliRecebAbertoBrysa');
r = {};
forty(function (err, result) {
    if (err) {
        console.log(err);
    }
    else {
        r.fortyflex = result;
    }
});
brysa(function (err, result) {
    if (err) {
        console.log(err);
    }
    else {
        r.brysaflex = result;
    }
});



function qforty(callback) {
    if (r == []) {
        callback({ message: "erro" }, [])
    }
    else {
        unificar(r);
        callback(undefined, r)
    }
}

function unificar(r) {

    // pegar nome da filial: Object.keys(r)[i]
    // Object.entries(r).at(i).at(1)
    for(let i = 0; i < Object.keys(r).length -1; i++){
        for(let x = 0; x < Object.keys(r).at(i).at(1).length; x++){
            v = Object.entries(r).at(i).at(1)[x];
            for(let z = 1; z < Object.keys(r).length; z ++){
                for(let a = 0; a < Object.keys(r).at(z).at(1).length; a++){
                    b = Object.entries(r).at(z).at(1)[a];
                    if(v == b){
                        console.log("igual");
                    }
                }
            }
        }
    }
}

module.exports = qforty;