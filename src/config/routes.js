const routes = require('express').Router();
const loginController = require('../controllers/authControllers/loginController');
const registerController = require('../controllers/authControllers/registerController');
const homeController = require('../controllers/homeController');
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middlewares/authMiddleware').authenticate;

routes.all('/', authenticate, homeController)
routes.use('/login', loginController);
routes.use('/register', registerController);
routes.use('/transaction', authenticate, transactionController);


module.exports = routes;