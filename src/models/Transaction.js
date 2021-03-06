const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    _budgetId: {
        type: mongoose.Types.ObjectId,
        ref: 'Budget',
        required: true,
    },
    budgetName: {
        type: String,
        required: true,
    },
    
    type: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    expense: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: [0.01, 'Sorry you cannot send empty transactions'],
    },
    date: {
        type: String,
        required: true,
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema, 'Transaction');

module.exports = Transaction