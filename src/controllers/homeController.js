const router = require('express').Router();
const User = require('../models/User');
const { splitTransactionData }= require('../utils/transactionUtils')
const { addTransaction } = require('../services/transactionService');
const {formatter} = require('../utils/currencyFormatter')

router.get('/', (req, res) => {
    User.findById(req.user._id)
        .lean()
        .then(user => {
            user.balance = formatter.format(user.balance)
            res.render('home', {user})
            
        });
})

router.post('/', async (req, res) => {
    let { type, category, expense, date, amount } = splitTransactionData(req.body);
    let user = await User.findById(req.user._id).lean();
    user.balance = formatter.format(user.balance)


    let error = await addTransaction(user._id, type, category, expense, date, amount);

    if (error) {
        res.render('home', {user, error})
        return;
    }

    res.render('home', {user});
    
})

module.exports = router;