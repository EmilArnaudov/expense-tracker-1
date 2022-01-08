const routes = require('express').Router();
const loginController = require('../controllers/authControllers/loginController');
const registerController = require('../controllers/authControllers/registerController');
const homeController = require('../controllers/homeController')

routes.use('/', homeController)
routes.use('/login', loginController);
routes.use('/register', registerController);

module.exports = routes;