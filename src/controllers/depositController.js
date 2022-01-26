const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('makeDeposit');
})

module.exports = router;