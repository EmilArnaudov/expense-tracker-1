const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.addTransaction = async function (user, type, category, expense, date, amount) {
    let transaction = new Transaction({_ownerId: user, type, category, expense, date, amount});

    try {
        await transaction.save();
        return;
    } catch (error) {
        return error.message;
    }
    
}