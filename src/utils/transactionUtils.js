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