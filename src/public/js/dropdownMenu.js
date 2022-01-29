let userElement = document.querySelector('#user');
userElement.addEventListener('click', showMenu);

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showMenu() {
    let element = document.querySelector('#myDropdown')
    let list = Array.from(element.classList);

    if (list.includes('hidden')) {
        element.classList.remove('hidden')
    } else {
        element.classList.add('hidden')
    }
  }
  
