const catElement = document.getElementById('category-select');
const expElement = document.getElementById(`transaction-category-${catElement.dataset.category}`);
const expLabel = document.getElementById('expense-label');
const budElement = document.getElementById('transaction-budget');

window.onload = load;

function selectUserChoises(categoryElement, expenseElement, budgetElement, expenseLabel) {
    let budgetName = budgetElement.dataset.budget;
    let category = categoryElement.dataset.category;
    let expense = expenseElement.dataset.expense;


    expenseLabel.classList.remove('hidden');
    expenseElement.classList.remove('hidden');

    Array.from(budgetElement.options).forEach(childEl => {
        if (childEl.textContent === budgetName) {
            childEl.selected = true;
        }
    });

    Array.from(categoryElement.options).forEach(childEl => {
        if (childEl.value === category) {
            childEl.selected = true;
        }
    });

    Array.from(expenseElement.options).forEach(childEl => {
        childEl.classList.remove('hidden');

        if (childEl.value === expense) {
            childEl.selected = true;
        }
    })


}

function load() {
    selectUserChoises(catElement, expElement, budElement, expLabel)
}