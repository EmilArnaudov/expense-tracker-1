const router = require('express').Router();
const Balance = require('../models/Balance');
const User = require('../models/User');
const { formatter } = require('../utils/currencyFormatter')

router.get('/', async (req, res) => {
    let user = await User.findById(req.user._id).lean();
    let balance = await Balance.findOne({_ownerId: user._id}).lean();
    balance = formatter.format(balance.balance)
    user.balance = balance;
    res.render('home', {user})
})

module.exports = router;