const router = require('express').Router();
const { splitBudgetData } = require('../utils/budgetUtils');
const { saveBudget } = require('../services/budgetService');
const User = require('../models/User');
const Budget = require('../models/Budget');



router.get('/all', async (req, res) => {
    User.findById(req.user._id)
        .lean()
        .then(async (user) => {
            let budgets = await Budget.find({_ownerId: user._id}).lean();
            res.render('budgets', {user, budgets})
            
        });
})

router.get('/create', (req, res) => {
    res.render('createBudget');
})

router.post('/create', async (req, res) => {
    const {title, maxValue} = splitBudgetData(req.body);
    let error = await saveBudget(req.user._id, title, maxValue);

    if (error) {
        res.render('createBudget', {budgetError: error})
        return;
    }

    res.redirect('/');

})
module.exports = router;
