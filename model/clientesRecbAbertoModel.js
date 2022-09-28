
r = {};

function qforty(callback) {
    if (r == []) {
        callback({ message: "erro" }, [])
    }
    else {
        callback(undefined, r)
    }
}

module.exports = qforty;