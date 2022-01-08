const express = require('express');
const { engine } = require('express-handlebars');
const routes = require('./routes');
const path = require('path');
const { urlencoded } = require('express');


// Init application
const app = express();

//Set up req body parser
app.use(express.urlencoded({extended: true}));

//Set up view engine
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs',
}));
app.set('view engine', 'hbs')

//Set up static files
app.use(express.static(path.resolve(__dirname, './public')));

//Set up routes
app.use(routes);





module.exports = app;