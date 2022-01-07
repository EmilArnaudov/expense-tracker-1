const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('im here');
    res.render('registerPage');
})

module.exports = router;