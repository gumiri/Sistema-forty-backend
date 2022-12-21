var tokens = []

function getUserToken(user){
    for (let i = 0; i < tokens.length; i++){
        if (user == tokens[i].user){
            return tokens[i]
        }
    }
    return false;
}

function removeExpiredUserToken(user){
    let now = new Date().getTime();
    for (let i = 0; i < tokens.length; i++){
        if (user == tokens[i].user){
            if (now > tokens[i].expire){
                tokens.splice(i, 1);
                return true;
            }
        }
    }
    return false;
}

function getTokenObjectByToken (token){
    for (let i = 0; i < tokens.length; i++){
        if (token == tokens[i].token){
            return tokens[i]
        }
    }
    return false;
}

module.exports = {tokens, getUserToken, removeExpiredUserToken, getTokenObjectByToken};