const app = require('./config/express');
const constants = require('./utils/constants');
const express = require('express');
const path = require('path');

app.use(express.static(path.resolve(__dirname, './public')));
console.log(__dirname);
app.listen(constants.PORT, () => {
    console.log(`Server is running on port ${constants.PORT}`);
})
