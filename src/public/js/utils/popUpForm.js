const categorySelectElement = document.querySelector('#category-select');
categorySelectElement.addEventListener('change', loadExpenseMenu)
const errorDiv = document.querySelector('#errorMessage');
const addTransactionButton = document.querySelector('#addTransactionButton');

errorHandler(errorDiv, addTransactionButton);

function loadExpenseMenu(e) {
    const form = document.querySelector('#transaction-form')
    refreshExpenseMenu(form);

    let selectedCategory = e.currentTarget.value;
    let neededSubcategory = document.querySelector(`#transaction-category-${selectedCategory}`);
    let label = document.querySelector('#expense-label');
    neededSubcategory.selected = 'true';
    [neededSubcategory, label].forEach(x => x.classList.remove('hidden'));
}


function refreshExpenseMenu(form) {
    form.querySelectorAll('.expense').forEach(x => x.classList.add('hidden'))
}

function errorHandler(errorDiv, formButton) {
    if (errorDiv) {
        formButton.click();
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 6000);
    }
    
}