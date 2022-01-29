const routes = require('express').Router();
const loginController = require('../controllers/authControllers/loginController');
const registerController = require('../controllers/authControllers/registerController');
const homeController = require('../controllers/homeController');
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middlewares/authMiddleware').authenticate;
const budgetController = require('../controllers/budgetController');
const logoutController = require('../controllers/authControllers/logoutController');

routes.all('/', authenticate, homeController)
routes.use('/login', loginController);
routes.use('/register', registerController);
routes.use('/logout', authenticate, logoutController);
routes.use('/transaction', authenticate, transactionController);
routes.use('/budget', authenticate, budgetController);


module.exports = routes;