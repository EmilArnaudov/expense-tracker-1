const Deposit = require('../models/Deposit');
const Balance = require('../models/Balance');

exports.makeDeposit = async function(userId, category, amount) {
    console.log('im here');
    let deposit = new Deposit({_ownerId: userId, category, amount: Number(amount)});

    try {
        await updateUserInfo(userId, Number(amount))
        await deposit.save();
    } catch (error) {
        console.log(error);
        return error.message;
    }
}


async function updateUserInfo(userId, amount) {
    console.log(amount, typeof amount);
   await Balance.updateOne({_ownerId: userId}, {$inc: {balance: amount} })
}