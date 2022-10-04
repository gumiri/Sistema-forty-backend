const gClienteForty = require('./fortyflex/gClienteForty');
const gClienteBrysa = require('./brysaflex/gClienteBrysa');
const gClienteAlpha = require('./alphaflex/gClienteAlpha');
const gClienteVinil = require('./fortyvinil/gClienteVinil');
const gClienteMang = require('./mangmaster/gClienteMang');
const gClienteInsert = require('./htd_clientes/gClienteInsert');

Date.prototype.stringDate = function () {
    var date = new Date(this.valueOf())
    m = date.getMonth() + 1;
    d = date.getDate();
    y = date.getFullYear();
    m = (m > 9 ? '' : '0') + m;
    d = (d > 9 ? '' : '0') + d;

    return d + "." + m + "." + y;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var timestamp = new Date('10.04.2022');


function gClienteModel(callback) {
    if (r == []) {
        callback({ err: 'erro' }, []);
    }
    else {
        var timelimit = timestamp.addDays(90);
        r = {}
        gClienteForty(timestamp.stringDate(), timelimit.stringDate(), function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                r.fortyflex = result
                gClienteBrysa(timestamp.stringDate(), timelimit.stringDate(), function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        r.brysaflex = result
                        gClienteAlpha(timestamp.stringDate(), timelimit.stringDate(), function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                r.alphaflex = result
                                gClienteVinil(timestamp.stringDate(), timelimit.stringDate(), function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        r.fortyvinil = result
                                        gClienteMang(timestamp.stringDate(), timelimit.stringDate(), function (err, result) {
                                            if (err) {
                                                console.log(err);
                                            }
                                            else {
                                                r.mangmaster = result;
                                                if (Object.toString(r) != Object.toString({fortyflex:[],brysaflex:[],alphaflex:[],fortyvinil:[],mangmaster:[]})) {
                                                    var v = [];
                                                    var res = "";
                                                    for (let i = 0; i < Object.keys(r).length; i++) {
                                                        for (let z = 0; z < Object.values(r)[i].length; z++) {
                                                            for (let x = 0; x < Object.values(Object.values(r)[i][z]).length; x++) {
                                                                v[x] = Object.values(Object.values(r)[i][z])[x];
                                                            }
                                                            for (let a = 0; a < v.length; a++) {
                                                                if (typeof (v[a]) == "string") {
                                                                    res += `'${v[a]}',`;
                                                                }
                                                                else if (typeof (v[a]) == "number") {
                                                                    res += `${v[a]},`;
                                                                }
                                                                else {
                                                                    if (v[a] == null) {
                                                                        res += `null,`;
                                                                    }
                                                                    else if (typeof (v[a]) == "function") {
                                                                        res += ``;
                                                                    }
                                                                    else {
                                                                        res += `'${v[a].stringDate()}',`;
                                                                    }
                                                                }
                                                            }
                                                            res = res.substr(0, res.length - 1);
                                                            gClienteInsert(res, function (erro, result) {
                                                                if (err) {
                                                                    callback(erro, []);
                                                                }
                                                                else {
                                                                    console.log("inserido");
                                                                }
                                                            });
                                                            res = "";
                                                            v = [];
                                                        }
                                                    }
                                                    timestamp = timelimit;
                                                    callback(undefined, r);
                                                }
                                                else{
                                                    callback({erro: 'Já está atualizado!'},[])
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
    }
};

module.exports = gClienteModel;