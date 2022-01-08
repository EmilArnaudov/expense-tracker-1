const routes = require('express').Router();
const loginController = require('../controllers/authControllers/loginController');
const registerController = require('../controllers/authControllers/registerController');

routes.get('/', (req, res) => {
    res.redirect('/login');
})
routes.use('/login', loginController);
routes.use('/register', registerController);

module.exports = routes;