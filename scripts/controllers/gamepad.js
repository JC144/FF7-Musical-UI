class GamePad {
    constructor(gamepadConnectedEventCallback) {
        this.gamepadConnectedEventCallback = gamepadConnectedEventCallback;
        
        this.haveEvents = 'GamepadEvent' in window;
        this.haveWebkitEvents = 'WebKitGamepadEvent' in window;
        this.controllers = {};

        this.#initEventHandlers();
    }

    scangamepads() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i] && (gamepads[i].index in this.controllers)) {
                this.controllers[gamepads[i].index] = gamepads[i];
            }
        }
    }

    #connecthandler(e) {
        this.#addgamepad(e.gamepad);
    }

    #addgamepad(gamepad) {
        this.controllers[gamepad.index] = gamepad;

        //init buttons state
        this.keysPressed = [];
        for (let i = 0; i < gamepad.buttons.length; i++) {
            this.keysPressed.push(false);
        }

        (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame)(this.gamepadConnectedEventCallback);
    }

    #disconnecthandler(e) {
        this.#removegamepad(e.gamepad);
    }

    #removegamepad(gamepad) {
        delete this.controllers[gamepad.index];
    }

    #initEventHandlers() {
        if (this.haveEvents) {
            window.addEventListener("gamepadconnected", this.#connecthandler.bind(this));
            window.addEventListener("gamepaddisconnected", this.#disconnecthandler.bind(this));
        } else if (this.haveWebkitEvents) {
            window.addEventListener("webkitgamepadconnected", this.#connecthandler.bind(this));
            window.addEventListener("webkitgamepaddisconnected", this.#disconnecthandler.bind(this));
        } else {
            setInterval(this.scangamepads, 500).bind(this);
        }
    }
}

export { GamePad };