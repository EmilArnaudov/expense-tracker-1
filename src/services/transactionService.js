const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

exports.addTransaction = async function (user, type, category, expense, date, amount) {
    let transaction = new Transaction({_ownerId: user, type, category, expense, date, amount});

    try {
        let result = await transaction.save();
        console.log(`Successfully saved: ${result}`);    
    } catch (error) {
        return error.message;
    }
    
}