const app = require('./config/express');
const constants = require('../utils/constants');

app.listen(constants.PORT, () => {
    console.log(`Server is running on port ${constants.PORT}`);
})
