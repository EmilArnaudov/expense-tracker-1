const router = require('express').Router();
const User = require('../models/User');
const Budget = require('../models/Budget');
const { formatter } = require('../utils/currencyFormatter')


router.get('/', async (req, res) => {
    User.findById(req.user._id)
        .lean()
        .then(async (user) => {
            user.balance = formatter.format(user.balance)
            let budgets = await Budget.find({_ownerId: user._id}).lean();
            res.render('home', {user, budgets})
            
        });
})

module.exports = router;