const mongoose = require("mongoose");

exports.splitTransactionData = function (body) {
    console.log(body);
    let type = body['transaction-type'];
    let budget = new mongoose.Types.ObjectId(body['transaction-budget']);
    let category = body['transaction-category'];
    let expense = body[`transaction-expense-${category}`];
    let date = body['transaction-date'];
    let amount = body['transaction-amount'];

    return {type, budget, category, expense, date, amount};
}

exports.getDaysInMonth = function (m, y) {
    return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
}

exports.getFormattedDate = function(date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}