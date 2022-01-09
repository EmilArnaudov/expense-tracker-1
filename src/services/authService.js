const User = require('../models/User');

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