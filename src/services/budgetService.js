const Budget = require('../models/Budget');
const mongoose = require('mongoose');


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