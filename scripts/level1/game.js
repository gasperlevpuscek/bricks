function drawIt() {
    //balls
    var x = 450;
    var y = 500;
    var ballLaunched = false;

    var dx = 0;
    var dy = 0;
    var WIDTH = 900;
    var HEIGHT = 800;
    var r = 10;
    var ctx;

    //paddle
    var paddlex;
    var paddleh;
    var paddlew;
    var f = 0;
    var intervalId;


    //bricks
    var bricks;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;

    var cloudPng = new Image();
    cloudPng.src = "../images/cloud.png";

    var sunPng = new Image();
    sunPng.src = "../images/sun.png";

    var wooshSound = new Audio("../sounds/woosh.mp3");


    function circle(x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    function areAllBricksCleared() {
        for (var i = 0; i < NROWS; i++) {
            for (var j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    return false;
                }
            }
        }
        setTimeout(winGame, 1000);
        return true;
    }

    function bounceFromPaddle() {
        var paddleCenter = paddlex + (paddlew / 2);
        var hitOffset = (x - paddleCenter) / (paddlew / 2); // -1 (left edge) to 1 (right edge)
        var maxDx = 6;

        dx = hitOffset * maxDx;
        dy = -Math.abs(dy);
    }

    function draw() {
        clear();
        //premik ploščice levo in desno
        if (rightDown) {
            if ((paddlex + paddlew) < WIDTH) {
                paddlex += 5;
            } else {
                paddlex = WIDTH - paddlew;
            }
        }
        else if (leftDown) {
            if (paddlex > 0) {
                paddlex -= 5;
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
                dy = -4;
            }
        }

        ctx.fillStyle = '#dad230';

        circle(x, y, 10);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#b0671d';
        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();

        //riši opeke
        for (var i = 0; i < NROWS; i++) {
            for (var j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    ctx.drawImage(cloudPng, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }

        var rowheight = BRICKHEIGHT + PADDING + f / 2; //Smo zadeli opeko?
        var colwidth = BRICKWIDTH + PADDING + f / 2;
        var row = Math.floor(y / rowheight);
        var col = Math.floor(x / colwidth);
        //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
        if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy;
            bricks[row][col] = 0;
            wooshSound.volume = 0.5;
            wooshSound.play();
        }
        if (areAllBricksCleared()) {
            document.getElementById('canvasDiv').classList.add('game-won');
            drawSun();
            clearInterval(intervalId);
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
                endGame();
                clearInterval(intervalId);
            }
        }
        x += dx;
        y += dy;
    }

    // Inicializacija vsega
    function init_paddle() {
        paddleh = 10;
        paddlew = 130;
        paddlex = WIDTH / 2 - paddlew / 2;
        f = paddleh;
        x = paddlex + (paddlew / 2);
        y = HEIGHT - paddleh - r;
    }

    function initbricks() { //inicializacija opek - polnjenje v tabelo
        NROWS = 2;
        NCOLS = 3;
        BRICKWIDTH = (WIDTH / NCOLS) - 6;
        BRICKHEIGHT = 80;
        PADDING = 1;
        bricks = new Array(NROWS);
        for (var i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (var j = 0; j < NCOLS; j++) {
                bricks[i][j] = 1;
            }
        }
    }

    function drawSun() {
        clear();
        var sunWidth = 730;
        var sunHeight = 730;
        ctx.drawImage(sunPng, (WIDTH / 2) - (sunWidth / 2), 0, sunWidth, sunHeight);
    }



    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        intervalId = setInterval(draw, 10);
        return intervalId;
    }

    initbricks();
    init_paddle();
    init();
}