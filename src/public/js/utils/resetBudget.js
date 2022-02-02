const buttons = Array.from(document.querySelectorAll('button'));


buttons.forEach(button => button.addEventListener('click', sendData));


async function sendData(e) {
    let url = e.view.location.href;
    
    let response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
            text: e.target.textContent
        })
    })

    window.location = '/budget/all';
}