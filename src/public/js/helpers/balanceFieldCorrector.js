let balanceField = document.querySelector('#balance');
balanceField.addEventListener('input', correctField);


function correctField() {
    let balanceField = document.querySelector('#balance');
    let content = balanceField.value.trim();

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