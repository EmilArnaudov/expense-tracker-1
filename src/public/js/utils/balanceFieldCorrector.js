let balanceField = document.getElementById('balance');
balanceField.addEventListener('input', correctField);


function correctField(e) {
    let balanceField = e.currentTarget;
    let content = balanceField.value.trim();
    console.log(content);

    if (isNaN(Number(content))) {
        let corrected  = Array.from(content)
        corrected.pop();
        balanceField.value = corrected.join('');
    }

    if (content.includes('.')) {
        let [main, decimal] = content.split('.');
        if (decimal.length > 2) {
            let corrected = `${decimal[0]}${decimal[1]}`
            balanceField.value = `${main}.${corrected}`
        }
    }

}