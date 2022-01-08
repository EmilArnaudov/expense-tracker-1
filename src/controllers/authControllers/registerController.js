const router = require('express').Router();
const User = require('../../models/User');

router.get('/', (req, res) => {
    res.render('registerPage');
});

router.post('/', async (req, res) => {
    let {username, password, repeatPassword} = req.body;

    if (password !== repeatPassword) {
        res.render('registerPage', {errorMessage: 'Passwords must match.'})
        return;
    }

    try {
        let user =  new User({username, password});
        await user.save();
        res.redirect('/login');
    } catch (err) {
        let errorMessage = err.message.split('password: ')[1];
        res.render('registerPage', {errorMessage})
    }

})

module.exports = router;