const router = require('express').Router();
const {makeDeposit} = require('../services/depositService');

router.get('/', (req, res) => {
    res.render('makeDeposit');
})

router.post('/', async (req, res) => {
    let {category, amount} = req.body;

    console.log(category, amount);

    let error = await makeDeposit(req.user._id, category, amount);

    if (error) {
        res.render('makeDeposit', {depositError: error})
        return;
    };

    return res.redirect('/');

    
})

module.exports = router;