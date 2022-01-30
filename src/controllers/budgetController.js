const router = require('express').Router();
const { splitBudgetData } = require('../utils/budgetUtils');
const { saveBudget } = require('../services/budgetService');
const User = require('../models/User');
const Budget = require('../models/Budget');



router.get('/all', async (req, res) => {
    let budgets = await Budget.find({_ownerId: req.user._id}).lean();
    res.render('budgets', {budgets})
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
