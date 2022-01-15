const categorySelectElement = document.querySelector('#category-select');
categorySelectElement.addEventListener('change', loadExpenseMenu)

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