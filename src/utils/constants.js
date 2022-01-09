const PORT = 3000;
const DB_STRING = 'mongodb+srv://admin:emileadminnatova@cluster0.jmmmo.mongodb.net/Cluster0?retryWrites=true&w=majority';
const SECRET = 'LllllleettMMeeeiiIQqqAAAAHhhhh';
const TOKEN_COOKIE_NAME = 'id_token';

let constants = {
    PORT,
    DB_STRING,
    SECRET,
    TOKEN_COOKIE_NAME,
}

module.exports = constants;