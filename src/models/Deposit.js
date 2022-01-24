const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        min: [1, 'Sorry, you cannot make empty deposits.']
    }
})


const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;