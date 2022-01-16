const router = require('express').Router();
const User = require('../models/User');
const Budget = require('../models/Budget');
const { splitTransactionData }= require('../utils/transactionUtils')
const { addTransaction } = require('../services/transactionService');
const { formatter } = require('../utils/currencyFormatter')
const { splitBudgetData } = require('../utils/budgetUtils');
const { saveBudget } = require('../services/budgetService');

router.get('/', async (req, res) => {
    User.findById(req.user._id)
        .lean()
        .then(async (user) => {
            user.balance = formatter.format(user.balance)
            let budgets = await Budget.find({_ownerId: user._id}).lean();
            console.log(budgets);
            res.render('home', {user, budgets})
            
        });
})

router.post('/', async (req, res) => {
    let user = await User.findById(req.user._id).lean();
    let budgets = await Budget.find({_ownerId: user._id})
    user.balance = formatter.format(user.balance)

    if (req.requestType === 'transaction') {
        let { type, category, expense, date, amount } = splitTransactionData(req.body);
        let error = await addTransaction(user._id, type, category, expense, date, amount);
    
        if (error) {
            res.render('home', {user, budgets, transactionError: error})
            return;
        }
    
        res.render('home', {user});
    } else {
        const {category, maxValue} = splitBudgetData(req.body);
        let error = await saveBudget(user._id, category, maxValue);

        if (error) {
            res.render('home', {user, budgetError: error})
            return;
        }
    
        res.redirect('/');

    }


    
})

module.exports = router;