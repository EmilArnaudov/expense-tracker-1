const User = require('../models/User');
const jwtSign = require('../utils/jwtUtils').jwtSign
const constants = require('../utils/constants')

exports.register = async function (username, password) {
    try {
        let user =  new User({username, password});
        await user.save()
        return;
    } catch (err) {
        let errorMessage = err.message.split('failed: password: ' || 'password: ')[1];

        if (!errorMessage) {
            errorMessage =  err.message.split('failed: username: ' || 'username: ')[1];
        }

        if (!errorMessage) {
            errorMessage = 'Username already taken.';
        }

        return errorMessage
    }
}


exports.createToken = async function(user) {
    let payload = {
        _id: user._id,
        username: user.username
    }

    return jwtSign(payload, constants.SECRET)
}