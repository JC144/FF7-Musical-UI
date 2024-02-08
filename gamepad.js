var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.requestAnimationFrame;

function connecthandler(e) {
    addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;

    rAF(updateStatus);
}

function disconnecthandler(e) {
    removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
    delete controllers[gamepad.index];
}

function updateStatus() {
    scangamepads();
    for (j in controllers) {
        var controller = controllers[j];

        var leftAxis = document.getElementById("leftAxis");
        var rightAxis = document.getElementById("rightAxis");

        moveElement(leftAxis, controller.axes[0], controller.axes[1]);
        moveElement(rightAxis, controller.axes[2], controller.axes[3]);
    }
    rAF(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i] && (gamepads[i].index in controllers)) {
            controllers[gamepads[i].index] = gamepads[i];
        }
    }
}

if (haveEvents) {
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
} else if (haveWebkitEvents) {
    window.addEventListener("webkitgamepadconnected", connecthandler);
    window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
} else {
    setInterval(scangamepads, 500);
}



function moveElement(element, x, y) {
    var transform = getComputedStyle(element).transform;

    const newX = (x * 50) - 50;
    const newY = (y * 50) - 50;

    // Apply the new transformation
    element.style.transform = 'translate(' + newX + '%, ' + newY + '%)';
}
