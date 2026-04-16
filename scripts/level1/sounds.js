var wooshSound = new Audio("../sounds/woosh.mp3");
var gm = new Audio("../sounds/gloriousMorning.mp3");


function playWoosh() {
    wooshSound.volume = 0.4;
    wooshSound.play();
}

function playMusicLoop() {
    gm.loop = true;
    gm.volume = 0.06;
    gm.currentTime = 0;
    gm.play();
}
