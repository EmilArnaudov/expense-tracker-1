const routes = require('express').Router();
const loginController = require('../controllers/loginController');

routes.get('/', (req, res) => {
    res.redirect('/login');
})
routes.use('/login', loginController);

module.exports = routes;