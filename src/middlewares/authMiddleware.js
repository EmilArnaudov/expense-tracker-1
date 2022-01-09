const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const jwtVerify = require('../utils/jwtUtils').jwtVerify;

exports.authenticate = function(req, res, next) {
    // Look for Json Web Token
    let cookie = req.cookies[constants.TOKEN_COOKIE_NAME];

    // If not found do nothing // means user is guest
    if (!cookie) {
        next();
    }

    jwtVerify(token, constants.SECRET)
        .then(decodedToken => {
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        })
        .catch(err => {
            return res.status(401).redirect('/login');
        })
}

exports.authorize = function(req, res, next) {
    if (!req.user) {
        return res.status(401).redirect('/login');
    }
    next();
}