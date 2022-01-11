const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0.01, 'Sorry you cannot send empty transactions'],
    },
    date: {
        type: Date,
        required: true,
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction