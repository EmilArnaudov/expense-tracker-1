const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.addTransaction = async function (user, budget, type, category, expense, date, amount) {
    let transaction = new Transaction({_ownerId: user, _budgetId: budget, type, category, expense, date, amount});

    try {
        await transaction.save();
        await updateUserData(budget, user, amount);
        return;

    } catch (error) {
        console.log(error);
        return error.message;
    }
    
}

async function updateUserData(budgetId, userId, amount) {

    await Budget.findOneAndUpdate(
        {_id: budgetId},
        {$inc: {'currentValue': amount}}
        );
    
    let budget = await Budget.findOne({_id: budgetId});
    budget.percentageFilled = Math.round(budget.currentValue / budget.maxValue * 100);
    await budget.save()
    
    await User.findOneAndUpdate(
        {_id: userId},
        {$inc: {'balance': -amount}}
        );
    
}