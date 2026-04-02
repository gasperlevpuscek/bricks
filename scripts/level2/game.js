function drawIt() {
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

    var balls = [];

    //bricks
    var bricks;
    var brickTypes;
    var NROWS;
    var NCOLS;
    var BRICKWIDTH;
    var BRICKHEIGHT;
    var PADDING;

    var cloudPng = new Image();
    cloudPng.src = "../images/cloud.png";

    var raincloudPng = new Image();
    raincloudPng.src = "../images/raincloud.png";

    var sunPng = new Image();
    sunPng.src = "../images/sun.png";

    function createBall(x, y, dx, dy) {
        return {
            x: x,
            y: y,
            dx: dx,
            dy: dy
        };
    }


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
        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    return false;
                }
            }
        }
        setTimeout(winGame, 1000);
        return true;
    }

    function bounceFromPaddle(ball) {
        var paddleCenter = paddlex + (paddlew / 2);
        var hitOffset = (ball.x - paddleCenter) / (paddlew / 2); // -1 (left edge) to 1 (right edge)
        var maxDx = 6;

        ball.dx = hitOffset * maxDx;
        ball.dy = -Math.abs(ball.dy);
    }

    function splitBall(ball) {
        var splitDx = ball.dx === 0 ? 2 : Math.abs(ball.dx);
        balls.push(createBall(ball.x + r, ball.y, -splitDx, ball.dy));
        ball.dx = splitDx;
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
        ctx.fillStyle = '#5e3617';
        rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

        //riši opeke
        for (i = 0; i < NROWS; i++) {
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    if (brickTypes[i][j] == 1) {
                        ctx.drawImage(raincloudPng, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                    } else {
                        ctx.drawImage(cloudPng, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
                    }
                }
            }
        }

        for (var b = balls.length - 1; b >= 0; b--) {
            var ball = balls[b];

            ctx.fillStyle = '#ffe100';
            circle(ball.x, ball.y, r);

            rowheight = BRICKHEIGHT + PADDING + f / 2; //Smo zadeli opeko?
            colwidth = BRICKWIDTH + PADDING + f / 2;
            row = Math.floor(ball.y / rowheight);
            col = Math.floor(ball.x / colwidth);
            //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
            if (ball.y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
                bricks[row][col] = 0;
                ball.dy = -ball.dy;
                if (brickTypes[row][col] == 1) {
                    splitBall(ball);
                }
            }

            if (ball.x + ball.dx > WIDTH - r || ball.x + ball.dx < 0 + r) {
                ball.dx = -ball.dx;
            }
            if (ball.y + ball.dy < 0 + r) {
                ball.dy = -ball.dy;
            }
            else if (ball.y + ball.dy > HEIGHT - (r + f)) {
                if (ball.x > paddlex && ball.x < paddlex + paddlew) {
                    bounceFromPaddle(ball);
                }
                else if (ball.y + ball.dy > HEIGHT - r) {
                    balls.splice(b, 1);
                    if (balls.length === 0) {
                        endGame();
                        clearInterval(intervalId);
                        return;
                    }
                    continue;
                }
            }

            ball.x += ball.dx;
            ball.y += ball.dy;
        }

        if (areAllBricksCleared()) {
            drawSun();
            clearInterval(intervalId);
            return;
        }
    }

    // Inicializacija vsega
    function init_paddle() {
        paddleh = 10;
        paddlew = 130;
        paddlex = WIDTH / 2 - paddlew / 2;
        f = paddleh;
    }

    function initbricks() { //inicializacija opek - polnjenje v tabelo
        NROWS = 5;
        NCOLS = 5;
        BRICKWIDTH = (WIDTH / NCOLS) - 6;
        BRICKHEIGHT = 60;
        PADDING = 2;
        bricks = new Array(NROWS);
        brickTypes = new Array(NROWS);
        for (i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            brickTypes[i] = new Array(NCOLS);
            for (j = 0; j < NCOLS; j++) {
                bricks[i][j] = 1;
                brickTypes[i][j] = Math.random() < 0.2 ? 1 : 0;
            }
        }
    }

    function drawSun() {
        clear();
        ctx.fillStyle = '#86d7ff';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        var sunWidth = 180;
        var sunHeight = 180;
        ctx.drawImage(sunPng, (WIDTH / 2) - (sunWidth / 2), 100, sunWidth, sunHeight);
    }



    function init() {
        ctx = $('#canvas')[0].getContext("2d");
        WIDTH = $("#canvas").width();
        HEIGHT = $("#canvas").height();
        balls.push(createBall(450, 500, 0, 4));
        intervalId = setInterval(draw, 10);
        return intervalId;
    }

    initbricks();
    init_paddle();
    init();
}