const app = require('./config/express');
const constants = require('./utils/constants');
const mongoose = require('mongoose');
const DB_STRING = require('./utils/constants');


mongoose.connect(constants.DB_STRING)
    .then(() => {
        app.listen(constants.PORT, () => {
            console.log('Successfully connected to database...')
            console.log(`Server is running on port ${constants.PORT}...`);
        })
    })
    .catch(err => {console.log(`Could not start server: ${err}`)})

