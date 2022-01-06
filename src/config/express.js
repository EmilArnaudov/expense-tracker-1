const express = require('express');
const handlebars = require('express-handlebars');

// Init application
const app = express();

//Set up view engine
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
}));

app.set('view engine', 'hbs')


module.exports = app;