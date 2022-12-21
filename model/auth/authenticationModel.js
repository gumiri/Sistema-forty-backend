const users = require('./users');
const tokens = require('./tokens');
const timeToTokenExpire = 300000;

function isUser(user) {
    for (let i = 0; i < users.length; i++) {
        if (user.user == users[i].user && user.password == users[i].password) {
            return users[i];
        }
    }
    return false;
}

function generateToken() {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}

function authentication(user, callback) {
    let usuario = isUser(user);
    if (!user) {
        callback({ err: "Erro, usuário não authenticado" }, [], undefined);
    }
    else if (usuario) {
        let token;
        let expire;
        tokens.removeExpiredUserToken(usuario.user);
        if (tokens.getUserToken(usuario.user)) {
            let usertoken = tokens.getUserToken(usuario.user);
            token = usertoken.token;
            expire = usertoken.expire;
        }
        else {
            expire = new Date().getTime() + timeToTokenExpire;
            token = generateToken();
            tokens.tokens.push({ user: usuario.user, token, expire, auth: usuario.auth })
        }
        let data = {
            data: {
                user: usuario.user,
                auth: usuario.auth,
                token: token,
                expire
            }
        }
        callback(undefined, data, true);
    }
    else {
        callback(undefined, { message: "Usuário não autorizado" }, false);
    }
}

module.exports = authentication;