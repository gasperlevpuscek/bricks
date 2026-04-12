
//balls
var x = 450;
var y = 500;
var ballLaunched = false;

var dx = 0;
var dy = 0;
var WIDTH = 900;
var HEIGHT = 800;
var r = 13;
var ctx;

//paddle
var paddlex;
var paddleh;
var paddlew;
var f = 0;
var intervalId;
var gameEnded = false;
var lives = 3;


var score = 0;

//bricks
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var brickImages;

var cloud1png = new Image();
cloud1png.src = "../images/cloud1.png";
var cloud2png = new Image();
cloud2png.src = "../images/cloud2.png";
var cloud3png = new Image();
cloud3png.src = "../images/cloud3.png";
var cloudOptions = [cloud1png, cloud2png, cloud3png];

var sunPng = new Image();
sunPng.src = "../images/sun.png";

var ballPng = new Image();
ballPng.src = "../images/ball.png";

var padPng = new Image();
padPng.src = "../images/pad.png";



const particles = [];
var destroyedClouds = 0;
var remainingClouds = 0;



function areAllBricksCleared() {
    if (remainingClouds === 0) {
        var hd = document.getElementById("heartDiv");
        hd.style.display = 'none';

        var sd = document.getElementById("scoreDiv");
        sd.style.display = 'none';

        var bsd = document.getElementById("bestScoreDiv");
        bsd.style.display = 'none';

        return true;
    }
    return false;
}

function bounceFromPaddle() {
    var paddleCenter = paddlex + (paddlew / 2);
    var hitOffset = (x - paddleCenter) / (paddlew / 2); // -1 (left edge) to 1 (right edge)
    var maxDx = 6;

    dx = hitOffset * maxDx;
    dy = -Math.abs(dy);
}

function updateScore() {
    var scoreboard = document.getElementById('scoreText');
    scoreboard.textContent = score;
}

function loadBestScore() {
    var bestScoreText = document.getElementById('bestscoreText');
    var storedBestScore = localStorage.getItem('bestScore');

    if (storedBestScore === null) {
        storedBestScore = '0';
        localStorage.setItem('bestScore', storedBestScore);
    }

    bestScoreText.textContent = storedBestScore;
}

function saveBestScore() {
    var storedBestScore = parseInt(localStorage.getItem('bestScore') || '0', 10);

    if (score > storedBestScore) {
        localStorage.setItem('bestScore', score);
        var bestScoreText = document.getElementById('bestscoreText');
        bestScoreText.textContent = score;
    }
}



function draw() {
    if (gameEnded) {
        return;
    }

    clear();
    cloudParticles(ctx, particles, 0, 0, false);
    //premik ploščice levo in desno
    if (rightDown) {
        if ((paddlex + paddlew) < WIDTH) {
            paddlex += 7;
        } else {
            paddlex = WIDTH - paddlew;
        }
    }
    else if (leftDown) {
        if (paddlex > 0) {
            paddlex -= 7;
        } else {
            paddlex = 0;
        }
    }

    if (!ballLaunched) {
        x = paddlex + (paddlew / 2);
        y = HEIGHT - paddleh - r;

        if (launchRequested) {
            ballLaunched = true;
            launchRequested = false;
            dx = 0;
            dy = -6;
        }
    }


    ctx.drawImage(ballPng, x - r, y - r, r * 2, r * 2);
    ctx.drawImage(padPng, paddlex, HEIGHT - paddleh, paddlew, paddleh);


    //riši opeke
    for (var i = 0; i < NROWS; i++) {
        for (var j = 0; j < NCOLS; j++) {
            if (bricks[i][j] == 1) {
                ctx.drawImage(brickImages[i][j], (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
            }
        }
    }

    var rowheight = BRICKHEIGHT + PADDING + f / 2; //Smo zadeli opeko?
    var colwidth = BRICKWIDTH + PADDING + f / 2;
    var row = Math.floor(y / rowheight);
    var col = Math.floor(x / colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
        score = score + 50;
        updateScore();
        dy = -dy;
        cloudParticles(ctx, particles, x, y, true);
        bricks[row][col] = 0;
        remainingClouds--;
        destroyedClouds++;
        playWoosh();
    }
    if (areAllBricksCleared()) {
        gameEnded = true;
        clearInterval(intervalId);
        particles.length = 0;
        fadeInSun(ctx, sunPng);
        document.getElementById('canvasDiv').classList.add('game-won');
        setTimeout(winGame, 1200);
        return;

    }

    if (x + dx > WIDTH - r || x + dx < 0 + r) {
        dx = -dx;
    }
    if (y + dy < 0 + r) {
        dy = -dy;
    }
    else if (y + dy > HEIGHT - (r + f)) {
        if (x > paddlex && x < paddlex + paddlew) {
            bounceFromPaddle();
        }
        else if (y + dy > HEIGHT - r) {
            lives--;
            updateLivesDisplay();
            score = score - 100;
            updateScore();
            if (lives <= 0) {
                gameEnded = true;
                endGame();
                clearInterval(intervalId);
            } else {
                ballLaunched = false;
                launchRequested = false;
                dx = 0;
                dy = 0;
            }
        }
    }
    x += dx;
    y += dy;
}

function drawIt() {
    initbricks();
    init_paddle();
    init();
    updateLivesDisplay();
}