
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
    helpBtn.addEventListener('click', showHelpAlert);
}

var retryBtn = document.getElementById('retryBtn');
if (retryBtn) {
    retryBtn.addEventListener('click', function () {
        window.location.reload();
    });
}


function showHelpAlert() {
    Swal.fire({
        title: "How To Play",
        html: "Use Left and Right arrow keys to move.<br>Press Space to start.<br>Destroy all clouds to win.<br>If the ball touches the bottom, you lose.",
        confirmButtonColor: "#3c6be0",
        confirmButtonText: "OK",
        backdrop: false
    });
}
