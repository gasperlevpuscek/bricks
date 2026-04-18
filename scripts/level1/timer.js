
function updateTimerDisplay() {
    var timerText = document.getElementById('timerText');
    if (!timerText) {
        return;
    }


    var minutes = Math.floor(elapsedSeconds / 60);
    var seconds = elapsedSeconds % 60;
    var mm = minutes < 10 ? '0' + minutes : '' + minutes;
    var ss = seconds < 10 ? '0' + seconds : '' + seconds;
    timerText.textContent = mm + ':' + ss;
}

function getFormattedElapsedTime() {
    var minutes = Math.floor(elapsedSeconds / 60);
    var seconds = elapsedSeconds % 60;
    var mm = minutes < 10 ? '0' + minutes : '' + minutes;
    var ss = seconds < 10 ? '0' + seconds : '' + seconds;

    return mm + ':' + ss;
}

function startTimer() {
    if (timerStarted) {
        return;
    }


    timerStarted = true;
    timerIntervalId = setInterval(function () {

        if (isPaused) {
            return;
        }
        elapsedSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null;
    }
}
