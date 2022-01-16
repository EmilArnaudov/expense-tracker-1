const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        enum: ['housing', 'transportation', 'food', 'utilities', 'clothing', 'healthcare', 'insurance', 'household-items', 'personal', 'debt', 'savings', 'education', 'gifts', 'entertainment'],
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

    title: {
        type:String
    }
})

budgetSchema.pre('save', function() {
    this.percentageFilled = Math.round(this.currentValue / this.maxValue) * 100;
})

budgetSchema.pre('save', function() {
    let title;
    if (this.category === 'household-items') {
        title = 'Household Items';
    } else {
        title = this.category[0].toUpperCase() + this.category.slice(1);
    }

    this.title = title;
    
})

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;