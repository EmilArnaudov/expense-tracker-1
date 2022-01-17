const router = require('express').Router();
const { splitTransactionData }= require('../utils/transactionUtils');
const { addTransaction } = require('../services/transactionService');
const User = require('../models/User');
const Budget = require('../models/Budget');

router.get('/add', async (req, res) => {
    let budgets = await Budget.find({_ownerId: req.user._id});
    console.log(budgets);
    res.render('addTransaction', {budgets});
})

router.post('/add', async (req, res) => {
    let { type, category, expense, date, amount } = splitTransactionData(req.body);

    let budgets = await Budget.find({_ownerId: req.user._id})
    let error = await addTransaction(req.user._id, type, category, expense, date, amount);

    if (error) {
        res.render('addTransaction', {budgets, transactionError: error})
        return;
    }

    res.redirect('/');
})
module.exports = router;