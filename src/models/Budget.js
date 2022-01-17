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
        max: 0,
    },

    percentageFilled: {
        type: Number,
    },
})

budgetSchema.pre('save', function() {
    this.percentageFilled = Math.round(this.currentValue / this.maxValue) * 100;
})

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;