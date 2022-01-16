exports.requestType = function(req, res, next) {
    if (req.body['budget-category']) {
        req.requestType = 'budget';
    } else {
        req.requestType = 'transaction';
    }

    next();
}