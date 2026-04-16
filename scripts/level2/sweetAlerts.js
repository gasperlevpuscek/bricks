
function endGame() {
    saveBestScore();

    Swal.fire({
        title: "You Lose",
        text: "Ball touched the bottom",
        confirmButtonColor: "#d64330",
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
        title: "You Win",
        html: `You cleared all the clouds<br>
               Your score: ${score}`,
        confirmButtonColor: "#0a9952",
        confirmButtonText: "Retry",
        showDenyButton: true,
        denyButtonColor: "#3c6be0",
        denyButtonText: "Level 1",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        backdrop: false
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.reload();
        } else if (result.isDenied) {
            window.location.href = "level1.html";
        }
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


var helpBtn = document.getElementById('helpBtn');
if (helpBtn) {
    helpBtn.addEventListener('click', showHelpAlertLevel2);
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

function showHelpAlertLevel2() {
    Swal.fire({
        title: "Level 2 Rules",
        html: `
            <div style="text-align:left; font-size:15px; line-height:1.6;">
                <p><b>Move:</b> Left / Right arrow keys</p>
                <p><b>Launch:</b> Press Space</p>
                <p><b>Objective:</b> Destroy all clouds</p>
                <hr style="border:0; border-top:1px solid rgba(255,255,255,0.18); margin:10px 0;">
                <p><b>Lives:</b> You have 3 lives</p>
                <p>You lose a life when the ball hits the bottom</p>
                <hr style="border:0; border-top:1px solid rgba(255,255,255,0.18); margin:10px 0;">
                <p><b>Dark clouds:</b> Hitting a dark cloud can spawn lightning</p>
                <p><b>Lightning:</b> If it hits your paddle, you get stunned for a short time</p>
            </div>
        `,
        confirmButtonText: "Start Level 2",
        confirmButtonColor: "#3c6be0",
        background: "#1e2a38",
        color: "#ffffff",
        backdrop: "rgba(0,0,0,0.7)",
        customClass: {
            popup: "game-alert-dark"
        }
    });
}