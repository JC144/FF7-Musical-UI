import { GamePad } from './gamepad.js';
import { ScreenPad } from './screenpad.js';

class Controllers {
    constructor(updateStatusCallback) {
        this.screenPad = new ScreenPad();
        this.gamepad = new GamePad(updateStatusCallback);
        this.keysPressed = this.#getKeysPressed();
        this.axes = [0, 0, 0, 0];
    }

    updateStatus() {
        this.gamepad.scangamepads();
        this.controller = this.gamepad.controllers[0];

        this.#setUIButtons();

        this.#getKeysPressed();

        if (this.screenPad.leftAxes[0] != 0 || this.screenPad.leftAxes[1] != 0) {
            this.axes[0] = this.screenPad.leftAxes[0];
            this.axes[1] = this.screenPad.leftAxes[1];
        }
        else if (this.controller) {
            this.axes[0] = this.controller.axes[0];
            this.axes[1] = this.controller.axes[1];
        }
        else {
            this.axes[0] = 0;
            this.axes[1] = 0;
        }

        if (this.screenPad.rightAxes[0] != 0 || this.screenPad.rightAxes[1] != 0) {
            this.axes[2] = this.screenPad.rightAxes[0];
            this.axes[3] = this.screenPad.rightAxes[1];
        }
        else if (this.controller && this.controller.axes.length <= 4) {
            this.axes[2] = this.controller.axes[2];
            this.axes[3] = this.controller.axes[3];
        }
        //PS5 controller
        else if (this.controller && this.controller.axes.length > 4) {
            this.axes[2] = this.controller.axes[3];
            this.axes[3] = this.controller.axes[4];
        }
        else {
            this.axes[2] = 0;
            this.axes[3] = 0;
        }
    }

    #getKeysPressed() {
        this.keysPressed = [];
        if (this.controller !== undefined && this.controller !== null) {
            for (let i = 0; i < this.controller.buttons.length; i++) {
                this.keysPressed[i] = this.controller.buttons[i].pressed;
            }
            //PS5 controller
            if (this.controller.axes.length > 4) {
                let squareValue = this.keysPressed[3];
                let triangleValue = this.keysPressed[2];
                let l3Value = this.keysPressed[11];
                let r3Value = this.keysPressed[12];
                this.keysPressed[3] = triangleValue;
                this.keysPressed[2] = squareValue;
                this.keysPressed[10] = l3Value;
                this.keysPressed[11] = r3Value;
            }
        }
        else {
            for (let i = 0; i < this.screenPad.keysPressed.length; i++) {
                this.keysPressed[i] = this.screenPad.keysPressed[i];
            }
            this.screenPad.reinitOctaveButtons();
        }
    }

    #setUIButtons() {
        let button_lt = document.getElementById('button_lt');
        let button_rt = document.getElementById('button_rt');
        let button_lb = document.getElementById('button_lb');
        let button_a = document.getElementById('button_a');
        let button_b = document.getElementById('button_b');
        let button_x = document.getElementById('button_x');
        let button_up = document.getElementById('button_up');

        if (this.controller === undefined || this.controller === null) {
            button_lt.style.display = 'none';
            button_rt.style.display = 'none';
            button_lb.style.display = 'none';
            button_a.style.display = 'none';
            button_b.style.display = 'none';
            button_x.style.display = 'none';
            button_up.style.display = 'none';
        }
        else {
            button_lt.style.display = 'block';
            button_rt.style.display = 'block';
            button_lb.style.display = 'block';
            button_a.style.display = 'block';
            button_b.style.display = 'block';
            button_x.style.display = 'block';
            button_up.style.display = 'block';
            //PS5
            if (this.controller.axes.length > 4) {
                button_lt.src = "images/playstation/PS5_L2.png";
                button_rt.src = "images/playstation/PS5_R1.png";
                button_lb.src = "images/playstation/PS5_L1.png";
                button_a.src = "images/playstation/PS5_Cross";
                button_b.src = "images/playstation/PS5_Circle.png";
                button_x.src = "images/playstation/PS5_Square.png";
                button_up.src = "images/xbox/icons8-scroll-up-50.png";
            }
            //XBOX
            else {
                button_lt.src = "images/xbox/icons8-xbox-lt-50.png";
                button_rt.src = "images/xbox/icons8-xbox-rt-50.png";
                button_lb.src = "images/xbox/icons8-xbox-lb-50.png";
                button_a.src = "images/xbox/icons8-xbox-a-50.png";
                button_b.src = "images/xbox/icons8-xbox-b-50.png";
                button_x.src = "images/xbox/icons8-xbox-x-50.png";
                button_up.src = "images/xbox/icons8-scroll-up-50.png";
            }
        }
    }
}

export { Controllers };