const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
    res.render('registerPage');
});

router.post('/', (req, res) => {
    let {username, password, repeatPassword} = req.body;

    if (password !== repeatPassword) {
        res.render('registerPage', {errorMessage: 'Passwords must match.'})
        return;
    }

    res.render('registerPage');

})

module.exports = router;