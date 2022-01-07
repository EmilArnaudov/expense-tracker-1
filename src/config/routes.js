const routes = require('express').Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

routes.get('/', (req, res) => {
    res.redirect('/login');
})
routes.use('/login', loginController);
routes.use('/register', registerController);

module.exports = routes;