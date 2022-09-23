// Colocar em um .env !!!
const dbOptions = {
    host: '127.0.0.1',
    port: 3050,
    database: 'C:/Users/elian/Documents/Sistema_de_Cobranca/HTD_DB.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096,        // default when creating database
    pageSize: 4096,        // default when creating database
    retryConnectionInterval: 1000 // reconnect interval in case of connection drop
};

module.exports = dbOptions;