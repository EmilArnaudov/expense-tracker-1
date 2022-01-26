const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: ['salary',
            'dividends',
            'capital-gains',
            'interest',
            'clothing',
            'other'],
        required: true,
    },
    amount: {
        type: Number,
        min: [0.1, 'Sorry, you cannot make empty deposits.']
    }
})


const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;