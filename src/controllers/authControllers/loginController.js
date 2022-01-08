const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('loginPage');
})

module.exports = router;