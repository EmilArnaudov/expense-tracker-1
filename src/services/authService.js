const User = require('../models/User');
const Balance = require('../models/Balance');
const jwtSign = require('../utils/jwtUtils').jwtSign
const constants = require('../utils/constants');

exports.register = async function (username, password, repass, balance) {
    if (password !== repass) {
        return 'Passwords must match.'
    }

    try {
        let user =  new User({username, password});
        let userModel = await user.save();
        let balanceModel = new Balance({_ownerId: userModel._id, balance: balance})
        await balanceModel.save();
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

exports.login =  function(username, password) {
    return User.findOne({username})
        .then(user => Promise.all([user.validatePassword(password), user]))
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            } else {
                throw TypeError('Username wrong')
            }
        })
        .catch(() => null);
}


exports.createToken = async function(user) {
    let payload = {
        _id: user._id,
        username: user.username
    }

    return jwtSign(payload, constants.SECRET)
}