const router = require('express').Router();
const login = require('../../services/authService').login
const createToken = require('../../services/authService').createToken
const constants = require('../../utils/constants');

router.get('/', (req, res) => {
    res.render('loginPage');
})


router.post('/', async (req, res) => {
    let {username, password} = req.body;
    let errorMessage = 'Username or password doesn\'t match.'

    try {
        let user = await login(username, password);
        let token = await createToken(user);

        res.cookie(constants.TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
        })
        
        res.redirect('/');

    } catch (err) {
        return res.render('loginPage', {errorMessage});
    }
    



})
module.exports = router;