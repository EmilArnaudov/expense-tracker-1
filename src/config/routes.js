const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.redirect('/login');
})

module.exports = routes;