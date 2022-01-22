module.exports = { 
    ifEquals: function(arg1, arg2, html) {
        if (arg1 === arg2) {
            html.selected = true;
        }

        return html;
    }
}