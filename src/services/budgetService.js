const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const { getDaysInMonth } = require('../utils/transactionUtils');
const { getFormattedDate } = require('../utils/transactionUtils');

exports.saveBudget = async function(userId, budgetTitle, budgetMaxValue) {
    try {
        let budget = new Budget({_ownerId: userId, title: budgetTitle, maxValue: budgetMaxValue, currentValue: 0});
        await budget.save();
        return;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}

exports.resetBudget = async function(budgetId) {
    let budget = await Budget.findOne({_id: budgetId});
    budget.currentValue = 0;
    budget.percentageFilled = 0;
    await budget.save();
}

exports.getCommand = function(data) {
    return Object.keys(data)[0].split('"')[3];
}

exports.deleteBudget = async function(budgetId) {
    await Budget.deleteOne({_id: budgetId});
}

exports.getTotalBudgetValues = function(budgets) {
    let currentValue = 0;
    let maxValue = 0;

    budgets.forEach(budget => {
        currentValue += budget.currentValue;
        maxValue += budget.maxValue;
    })

    let totalPercentageFilled = (currentValue / maxValue) * 100

    return [currentValue.toFixed(2), maxValue.toFixed(2), totalPercentageFilled];
}