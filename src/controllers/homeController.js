const router = require('express').Router();
const Balance = require('../models/Balance');
const User = require('../models/User');
const { formatter } = require('../utils/currencyFormatter');
const { getTransactionSortedByCategory } = require('../services/transactionService');

router.get('/', async (req, res) => {
    let user = await User.findById(req.user._id).lean();
    let balance = await Balance.findOne({_ownerId: user._id}).lean();
    let [transactionObject, monthlyTotal] = await getTransactionSortedByCategory(req.user._id);

    console.log(transactionObject);

    monthlyTotal = formatter.format(monthlyTotal);
    balance = formatter.format(balance.balance)
    user.balance = balance;
    res.render('home', {monthlyTotal, user, transactionObject, keys: Object.keys(transactionObject).map(x => {return {key: x, amount: transactionObject[x].totalAmount}})})
})

module.exports = router;