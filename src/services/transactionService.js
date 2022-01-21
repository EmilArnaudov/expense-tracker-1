const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Balance = require('../models/Balance');
const mongoose = require('mongoose');

exports.addTransaction = async function (user, budget, type, category, expense, date, amount) {
    let transaction = new Transaction({_ownerId: user, _budgetId: budget, type, category, expense, date, amount});

    try {
        await updateUserData(budget, user, amount);
        let finished_transaction = await insertBudgetNameInTransaction(budget, transaction);
        await finished_transaction.save();
        return;

    } catch (error) {
        console.log(error);
        return error.message;
    }
    
}


exports.editTransaction = async function(transactionId) {
    
}

async function updateUserData(budgetId, userId, amount) {

    let balance = await Balance.findOne({_ownerId: userId});

    if (!balance.balance - amount > 0 ) {
        throw new Error('You do not have enough money for this transaction.');
    }

    balance.balance -= amount;
    await balance.save();


    await Budget.findOneAndUpdate(
        {_id: budgetId},
        {$inc: {'currentValue': amount}}
        );
    
    let budget = await Budget.findOne({_id: budgetId});
    budget.percentageFilled = Math.round(budget.currentValue / budget.maxValue * 100);
    await budget.save()
}


async function insertBudgetNameInTransaction(budgetId, transaction) {
    let budget = await Budget.findOne({_id: budgetId});
    transaction.budgetName = budget.title;
    return transaction;
}