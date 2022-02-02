const budgetCards = Array.from(document.querySelectorAll('.budget-card'));

budgetCards.forEach(bc => bc.addEventListener('click', displayButtons));


function displayButtons(e) {
    let buttonsDiv = e.currentTarget.children[0].children[3];
    console.log(e.currentTarget);
    console.log(buttonsDiv);
    if (Array.from(buttonsDiv.classList).includes('hidden')) {
        buttonsDiv.classList.remove('hidden');
    } else {
        buttonsDiv.classList.add('hidden');
    }
}