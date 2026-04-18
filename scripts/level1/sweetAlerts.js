
function endGame() {
    saveBestScore();
    Swal.fire({
        title: "You Lose",
        text: "Ball touched the bottom",
        confirmButtonColor: "#dd4f88",
        confirmButtonText: "Retry",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        backdrop: false
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        }
    });
}



function winGame() {
    saveBestScore();
    Swal.fire({

        html: `<h1>You win!</h1><br>You cleared all the clouds in ${getFormattedElapsedTime()}<br>
               Your score: ${score}`,
        confirmButtonColor: "#4fa0dd",
        confirmButtonText: "Retry",
        showDenyButton: true,
        denyButtonColor: "#dccd5e",
        denyButtonText: "Next Level",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        backdrop: false,
        customClass: {
            popup: 'my-swal-popup'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        } else if (result.isDenied) {
            window.location.href = "level2.html";
        }
    });
}


function showHelpAlert() {
    Swal.fire({
        title: "How To Play",
        html: `
            <div style="text-align:left; font-size:15px; line-height:1.6;">
                <p><b>Move:</b> Left / Right arrow keys</p>
                <p><b>Launch:</b> Press Space</p>
                <p><b>Objective:</b> Destroy all clouds</p>
                <hr style="border:0; border-top:1px solid #8fc6f0; margin:10px 0;">
                <p><b>Lives:</b> You have 3 lives</p>
                <p>You lose a life when the ball hits the bottom</p>
            </div>
        `,
        confirmButtonText: "Ok",
        confirmButtonColor: "#4fa0dd",

        background: "#eaf4ff",
        color: "#1b2a41",

        backdrop: "rgba(100, 150, 255, 0.25)",

        customClass: {
            popup: "game-alert-bright"
        },

        showClass: {
            popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutUp"
        }
    });
}


var helpBtn = document.getElementById('helpBtn');
if (helpBtn) {
    helpBtn.addEventListener('click', showHelpAlert);
}

var retryBtn = document.getElementById('retryBtn');
if (retryBtn) {
    retryBtn.addEventListener('click', function () {
        window.location.reload();
    });
}

var pauseBtn = document.getElementById('pauseBtn');
if (pauseBtn) {
    pauseBtn.addEventListener('click', function () {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? 'PLAY' : 'PAUSE';
    });
}



function updateLivesDisplay() {
    var heartDiv = document.getElementById('heartDiv');
    if (heartDiv) {
        heartDiv.innerHTML = '';
        for (var i = 0; i < lives; i++) {
            heartDiv.innerHTML += '<img src="../images/heart.png" alt="Heart" class="heartIcon">';
        }
    }
}