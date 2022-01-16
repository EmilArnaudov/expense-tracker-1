const Budget = require('../models/Budget');
const mongoose = require('mongoose');


exports.saveBudget = async function(userId, budgetCategory, budgetMaxValue) {
    try {
        let budget = new Budget({_ownerId: userId, category: budgetCategory, maxValue: budgetMaxValue, currentValue: 0});
        await budget.save();
        return;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}