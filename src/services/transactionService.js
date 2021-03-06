const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Balance = require('../models/Balance');
const { getDaysInMonth } = require('../utils/transactionUtils');
const { getFormattedDate } = require('../utils/transactionUtils');

exports.addTransaction = async function (user, budget, type, category, expense, date, amount) {
    let transaction = new Transaction({_ownerId: user, _budgetId: budget, type, category, expense, date, amount});

    try {
        await updateUserData(budget, user, Number(amount));
        let finished_transaction = await insertBudgetNameInTransaction(budget, transaction);
        await finished_transaction.save();
        return;

    } catch (error) {
        console.log(error);
        return error.message;
    }
    
}


exports.editTransaction = async function(transaction, userId, type, budget, expense, category, amount) {
    try {
        if (Number(amount) === 0) {
            throw new Error('You cannot send empty transactions.');
        }

        await reverseUserData(transaction._budgetId, userId, Number(transaction.amount), Number(amount));

        transaction._budgetId = budget;
        transaction.expense = expense;
        transaction.category = category;
        transaction.amount = amount;

        await updateUserData(transaction._budgetId, userId, Number(amount));
        await transaction.save();
    } catch (error) {
        console.log(error);
        return error.message;
    }
}

exports.deleteTransaction = async function (transactionId, userId) {
    let transaction = await Transaction.findById(transactionId).lean();
    await reverseUserData(transaction._budgetId, userId, Number(transaction.amount), 0);
    await Transaction.findByIdAndDelete(transactionId);


}

async function updateUserData(budgetId, userId, amount) {

    let balance = await Balance.findOne({_ownerId: userId});

    if (!balance.balance - amount > 0 ) {
        throw new Error('You do not have enough money for this transaction.');
    }

    balance.balance -= amount;
    await balance.save();

    let budget = await Budget.findOne({_id: budgetId});
    budget.currentValue += amount;
    budget.percentageFilled = Math.round(budget.currentValue / budget.maxValue * 100);
    await budget.save()
}

async function reverseUserData(budgetId, userId, amount, newAmount) {

    let balance = await Balance.findOne({_ownerId: userId});
    console.log(typeof balance.balance , typeof amount, typeof newAmount);
    if ((balance.balance + amount) - newAmount < 0) {
        throw new Error('You do not have enough money for this transaction.')
    } 

    balance.balance += amount;
    await balance.save();

    let budget = await Budget.findOne({_id: budgetId});
    budget.currentValue -= amount;
    budget.percentageFilled = Math.round(budget.currentValue / budget.maxValue * 100);
    await budget.save()
}


async function insertBudgetNameInTransaction(budgetId, transaction) {
    let budget = await Budget.findOne({_id: budgetId});
    transaction.budgetName = budget.title;
    return transaction;
}

 async function getTransactionsNoDate(userId) {
    let date = new Date();
    let formattedDate = getFormattedDate(date);
    
    let [year, month] = formattedDate.split('-');
    yearFunc = parseInt(year);
    monthFunc = parseInt(month);

    let lastDayOfMonth = getDaysInMonth(monthFunc, yearFunc);

    let startingDate = `${year}-${month}-01`;
    let endingDate = `${year}-${month}-${lastDayOfMonth}`;

    let startingDateMongoose = `${year}-${month}-00`;
    let endingDateMongoose = `${year}-${month}-${lastDayOfMonth+1}`;

    let thisMonthsTransactions = await Transaction.find({_ownerId: userId, date: {$gt: startingDateMongoose, $lt: endingDateMongoose}}).lean();

    console.log(thisMonthsTransactions);
    
    return [thisMonthsTransactions, startingDate, endingDate];
}

exports.getTransactionsNoDate = getTransactionsNoDate;

exports.getTransactionsWithDate = async function getTransactionsWithDate(userId, startingDate, endingDate) {
    let thisMonthsTransactions = await Transaction.find({_ownerId: userId, date: {$gt: startingDate, $lt: endingDate}}).lean();
    
    return [thisMonthsTransactions, startingDate, endingDate];
}

exports.getTransactionSortedByCategory = async function(userId) {
    let [transactions] = await getTransactionsNoDate(userId);
    let transactionObject = {};
    let monthlyTotal = 0;

    transactions.forEach(tx => {
        if (!transactionObject.hasOwnProperty(tx.category)) {
            transactionObject[tx.category] = {transactions: [], totalAmount: 0};
        }

        transactionObject[tx.category].transactions.push(tx);
        transactionObject[tx.category].totalAmount += tx.amount;
        monthlyTotal += tx.amount;
    })

    return [transactionObject, monthlyTotal];
}