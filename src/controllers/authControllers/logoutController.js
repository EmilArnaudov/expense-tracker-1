const router = require('express').Router();
const constants = require('../../utils/constants');

router.get('/', (req, res) => {
    res.clearCookie(constants.TOKEN_COOKIE_NAME);

    res.redirect('/');
})

module.exports = router;