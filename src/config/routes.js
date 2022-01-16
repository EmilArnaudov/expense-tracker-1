const routes = require('express').Router();
const loginController = require('../controllers/authControllers/loginController');
const registerController = require('../controllers/authControllers/registerController');
const homeController = require('../controllers/homeController')
const authenticate = require('../middlewares/authMiddleware').authenticate;
const { requestType } = require('../middlewares/requestType');

routes.all('/', requestType, authenticate, homeController)
routes.use('/login', loginController);
routes.use('/register', registerController);

module.exports = routes;