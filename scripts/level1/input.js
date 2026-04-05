
var rightDown = false;
var leftDown = false;
var launchRequested = false;
// Keyboard input
function onKeyDown(evt) {
    if (evt.keyCode == 39)
        rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
    else if (evt.keyCode == 32) launchRequested = true;
}

function onKeyUp(evt) {
    if (evt.keyCode == 39)
        rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
