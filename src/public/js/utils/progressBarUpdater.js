const progressBars = document.querySelectorAll('.progress-bar');
progressBarBackgroundCorrector(progressBars);

function progressBarBackgroundCorrector(bars) {
    bars.forEach(element => {
        console.log(element);
        console.log(element.ariaValueNow);
        if (Number(element.ariaValueNow ) > 50 && Number(element.ariaValueNow) < 75) {
            element.classList.add('bg-warning');
        }

        if (Number(element.ariaValueNow) >= 75) {
            element.classList.add('bg-danger');
        }
    });
} 