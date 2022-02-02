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
        required: true,
    },

    currentValue: {
        type: Number,
        min: 0,
    },

    percentageFilled: {
        type: Number,
    },
})

budgetSchema.pre('save', function (next) {
    this.balance = Math.round(this.balance);
    next();
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;