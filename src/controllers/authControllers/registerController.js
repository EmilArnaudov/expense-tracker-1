const router = require('express').Router();
const register = require('../../services/authService').register;

router.get('/', (req, res) => {
    res.render('registerPage');
});

router.post('/', async (req, res) => {
    let {username, password, repeatPassword } = req.body;
    let data = await register(username, password, repeatPassword)

    if(!data) {
        res.redirect('/login')
        return;
    }

    res.render('registerPage', {errorMessage: data})


})

module.exports = router;