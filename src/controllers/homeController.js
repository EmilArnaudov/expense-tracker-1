const router = require('express').Router();
const User = require('../models/User');
const Budget = require('../models/Budget');
const Balance = require('../models/Balance');
const { formatter } = require('../utils/currencyFormatter')


router.get('/', async (req, res) => {
    User.findById(req.user._id)
        .lean()
        .then(async (user) => {
            let balance = await Balance.findOne({_ownerId: user._id}).lean();
            balance = formatter.format(balance.balance)
            user.balance = balance;
            let budgets = await Budget.find({_ownerId: user._id}).lean();
            res.render('home', {user, budgets})
            
        });
})

module.exports = router;