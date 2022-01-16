const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    maxValue: {
        type: Number,
        min: [1, 'Budget max value cannot be less than 1'],
    },

    currentValue: 0,
})

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;