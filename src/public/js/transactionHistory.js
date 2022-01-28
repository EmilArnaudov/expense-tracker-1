let dateColElement = document.querySelector('#date-col');
let budgetColElement = document.querySelector('#budget-col');
let categoryColElement = document.querySelector('#category-col');
let expenseColElement = document.querySelector('#expense-col');
let amountColElement = document.querySelector('#amount-col');

dateColElement.addEventListener('click', orderByDate);
budgetColElement.addEventListener('click', orderByBudget);
categoryColElement.addEventListener('click', orderByCategory);
expenseColElement.addEventListener('click', orderByExpense);
amountColElement.addEventListener('click', orderByAmount);


function orderByDate() {
    let allTableRows = Array.from(document.querySelector('tbody').children);
    let tbody = document.querySelector('tbody');

    let elementsToObjectsArray = allTableRows.map(x => {return {date: x.children[0].textContent, html: x}})
   
    let allTableRowsSorted = elementsToObjectsArray.sort((a,b) => a.date.localeCompare(b.date))

    allTableRowsSorted.forEach(x => tbody.appendChild(x.html));
}

function orderByBudget() {
    let allTableRows = Array.from(document.querySelector('tbody').children);
    let tbody = document.querySelector('tbody');

    let elementsToObjectsArray = allTableRows.map(x => {return {budget: x.children[2].textContent, html: x}})
   
    let allTableRowsSorted = elementsToObjectsArray.sort((a,b) => a.budget.localeCompare(b.budget))

    allTableRowsSorted.forEach(x => tbody.appendChild(x.html));
}

function orderByCategory() {
    let allTableRows = Array.from(document.querySelector('tbody').children);
    let tbody = document.querySelector('tbody');

    let elementsToObjectsArray = allTableRows.map(x => {return {category: x.children[3].textContent, html: x}})
   
    let allTableRowsSorted = elementsToObjectsArray.sort((a,b) => a.category.localeCompare(b.category))

    allTableRowsSorted.forEach(x => tbody.appendChild(x.html));
}

function orderByExpense() {
    let allTableRows = Array.from(document.querySelector('tbody').children);
    let tbody = document.querySelector('tbody');

    let elementsToObjectsArray = allTableRows.map(x => {return {expense: x.children[4].textContent, html: x}})
   
    let allTableRowsSorted = elementsToObjectsArray.sort((a,b) => a.expense.localeCompare(b.expense))

    allTableRowsSorted.forEach(x => tbody.appendChild(x.html));
}

function orderByAmount() {
    let allTableRows = Array.from(document.querySelector('tbody').children);
    let tbody = document.querySelector('tbody');

    let elementsToObjectsArray = allTableRows.map(x => {return {amount: Number(x.children[5].textContent.slice(1)), html: x}})
   console.log(elementsToObjectsArray[0].amount, typeof elementsToObjectsArray[0].amount);
    let allTableRowsSorted = elementsToObjectsArray.sort((a,b) => a.amount - b.amount)

    allTableRowsSorted.forEach(x => tbody.appendChild(x.html));
}