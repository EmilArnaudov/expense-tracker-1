const router = require('express').Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User.findById(req.user._id)
        .lean()
        .then(user => {
            console.log(user);
            res.render('home', {user})
        });
})

module.exports = router;