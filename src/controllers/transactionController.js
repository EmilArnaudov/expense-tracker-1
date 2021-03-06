const router = require('express').Router();
const { splitTransactionData }= require('../utils/transactionUtils');
const { addTransaction } = require('../services/transactionService');
const { editTransaction } = require('../services/transactionService');
const { deleteTransaction } = require('../services/transactionService');
const { getTransactionsNoDate } = require('../services/transactionService');
const { getTransactionsWithDate } = require('../services/transactionService');
const depositController = require('./depositController');
const { getCommand } = require('../services/budgetService');
const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

router.use('/deposit', depositController);


router.get('/edit/:id', async (req, res) => {
    let transactionId = req.params.id;

    let transaction = await Transaction.findById(transactionId).lean();
    let budgets = await Budget.find({_ownerId: req.user._id}).lean();

    res.render('editTransaction', { transaction, budgets });
})

router.post('/edit/:id', async (req, res) => {
    let transaction = await Transaction.findById(req.params.id);
    let budgets = await Budget.find({_ownerId: req.user._id}).lean();
    let { type, budget, category, expense, date, amount } = splitTransactionData(req.body);

    let error = await editTransaction(transaction, req.user._id, type, budget, expense, category, amount);

    if (error) {
        res.render('editTransaction', {transaction: transaction.toObject(), budgets, transactionError: error})
        return;
    }

    res.redirect('/');

})

router.get('/delete/:id', (req, res) => {
    res.render('transactionDelete');
})

router.post('/delete/:id', async (req, res) => {
    let txId = req.params.id;
    let command = getCommand(req.body);

    if (command === 'Yes') {
        await deleteTransaction(txId, req.user._id)
    }

    res.redirect('/');
})

router.get('/add', async (req, res) => {
    let budgets = await Budget.find({_ownerId: req.user._id}).lean();
    res.render('addTransaction', {budgets});
})

router.get('/history', async (req, res) => {
    let [thisMonthsTransactions, startingDate, endingDate] = await getTransactionsNoDate(req.user._id);
    console.log(thisMonthsTransactions, startingDate, endingDate);

    res.render('transactionHistory', { allTransactions: thisMonthsTransactions, startingDate, endingDate});
})

router.post('/history', async (req, res) => {
    let {startingDate, endingDate} = req.body;

    let [allTransactions] = await getTransactionsWithDate(req.user._id, startingDate, endingDate);

    res.render('transactionHistory', { allTransactions, startingDate, endingDate});
})

router.post('/add', async (req, res) => {
    let { type, budget, category, expense, date, amount } = splitTransactionData(req.body);

    let budgets = await Budget.find({_ownerId: req.user._id}).lean();
    let error = await addTransaction(req.user._id, budget, type, category, expense, date, amount);

    if (error) {
        res.render('addTransaction', {budgets, transactionError: error})
        return;
    }

    res.redirect('/');
    return;
})


module.exports = router;