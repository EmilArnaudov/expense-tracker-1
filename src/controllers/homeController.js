const router = require('express').Router();
const User = require('../models/User');
const { splitTransactionData }= require('../utils/transactionUtils')
const { addTransaction } = require('../services/transactionService');

router.get('/', (req, res) => {
    User.findById(req.user._id)
        .lean()
        .then(user => {
            res.render('home', {user})
        });
})

router.post('/', async (req, res) => {
    let { type, category, expense, date, amount } = splitTransactionData(req.body);
    let user = await User.findById(req.user._id).lean();
    
    let result = await addTransaction(user._id, type, category, expense, date, amount);

    if (result) {
        res.render('home', {user, error: result})
        return;
    }

    res.render('home', {user});
    
})

module.exports = router;