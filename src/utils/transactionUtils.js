exports.splitTransactionData = function (body) {
    let type = body['transaction-type'];
    let category = body['transaction-category'];
    let expense = body[`transaction-expense-${category}`];
    let date = body['transaction-date'];
    let amount = body['transaction-amount'];

    return {type, category, expense, date, amount};
}