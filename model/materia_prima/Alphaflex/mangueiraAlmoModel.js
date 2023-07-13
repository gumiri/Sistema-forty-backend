const needUserPermission = false;
const tokens = require('../../auth/tokens');

const mangAlmo = require('../../alphaflex/mangueirasAlmo');

async function materiaPrimaAlmo(token, callback) {
    if (needUserPermission) {
        if (token) {
            let userToken = tokens.getTokenObjectByToken(token);
            tokens.removeExpiredUserToken(userToken.user);
            if (userToken.token != token || !userToken.auth.includes('acessorios')) {
                callback({ err: 'erro, usuário não autorizado' }, []);
                return 0;
            }
        }
        else {
            callback({ err: 'erro, usuário não autorizado' }, []);
            return 0;
        }
    }
    const estoque = await mangAlmo.getAlmo();
    if (!estoque) {
        callback({ err: 'erro ao ler base de dados' }, []);
    }
    else {
        callback(undefined, { data: estoque });
    }
}

module.exports = materiaPrimaAlmo;