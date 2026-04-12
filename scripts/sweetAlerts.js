
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



function updateLivesDisplay() {
    var heartDiv = document.getElementById('heartDiv');
    if (heartDiv) {
        heartDiv.innerHTML = '';
        for (var i = 0; i < lives; i++) {
            heartDiv.innerHTML += '<img src="../images/heart.png" alt="Heart" class="heartIcon">';
        }
    }
}