const progressBars = document.querySelectorAll('.progress-bar');
progressBarBackgroundCorrector(progressBars);

function progressBarBackgroundCorrector(bars) {
    bars.forEach(element => {
        if (Number(element.ariaValueNow ) > 50 && Number(element.ariaValueNow) < 75) {
            element.classList.add('bg-warning');
        }

        if (Number(element.ariaValueNow) >= 75) {
            element.classList.add('bg-danger');
        }

        if (Number(element.ariaValueNow) > 100) {
            element.parentElement.parentElement.classList.add('max-exceeded');
        } else {
            element.parentElement.parentElement.classList.remove('max-exceeded');
        }
    });
} 