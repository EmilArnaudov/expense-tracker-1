const mongoose = require("mongoose");

const balanceSchema =  new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    balance: {
        type: Number,
        required: true,
        min: [0, 'Balance cannot be set to negative.']
    },
})

const Balance = mongoose.model('Balance', balanceSchema);


module.exports = Balance;


