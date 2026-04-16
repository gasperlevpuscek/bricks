var wooshSound = new Audio("../sounds/woosh.mp3");
var lightningSound = new Audio("../sounds/lightning1.mp3");
var gm = new Audio("../sounds/RaceAroundTheWorld.mp3");
var rainSound = new Audio("../sounds/rain.mp3");
var windSound = new Audio("../sounds/wind.mp3");


function playWoosh() {
    wooshSound.volume = 0.4;
    wooshSound.play();
}

function playLightning() {
    lightningSound.volume = 0.5;
    lightningSound.currentTime = 0;
    lightningSound.play();
}

function playMusicLoop() {
    gm.loop = true;
    gm.volume = 0.06;
    gm.currentTime = 0;
    gm.play();

    rainSound.loop = true;
    rainSound.volume = 0.1;
    rainSound.currentTime = 0;
    rainSound.play();

    windSound.loop = true;
    windSound.volume = 0.02;
    windSound.currentTime = 0;
    windSound.play();
}

function stopMusic() {

    gm.volume = 0;
    rainSound.volume = 0;
    windSound.volume = 0;
}
