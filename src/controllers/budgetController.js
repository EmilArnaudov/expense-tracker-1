const router = require('express').Router();
const { splitBudgetData } = require('../utils/budgetUtils');
const { saveBudget } = require('../services/budgetService');
const { resetBudget } = require('../services/budgetService');
const { deleteBudget } = require('../services/budgetService');
const { getCommand } = require('../services/budgetService');
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

router.get('/reset/:id', (req, res) => {
    res.render('budgetReset');
})

router.post('/reset/:id', async (req, res) => {
    let id = req.params.id;
    let command = getCommand(req.body);

    if (command === 'Yes') {
        await resetBudget(id)
    }

    res.redirect('/');
})

router.get('/delete/:id', (req, res) => {
    res.render('budgetDelete');
})

router.post('/delete/:id', async (req, res) => {
    let id = req.params.id;
    let command = getCommand(req.body);

    if (command === 'Yes') {
        await deleteBudget(id)
    }

    res.redirect('/');
})
module.exports = router;
