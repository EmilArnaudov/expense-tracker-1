exports.splitBudgetData = function(body) {
    let category = body['budget-category'];
    let maxValue = body['budget-maxvalue'];

    return {category, maxValue};
}