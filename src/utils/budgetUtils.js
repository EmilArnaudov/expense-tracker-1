exports.splitBudgetData = function(body) {
    let title = body['budget-title'];
    let maxValue = body['budget-maxvalue'];

    return {title, maxValue};
}