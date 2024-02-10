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
        else if (this.controller) {
            this.axes[2] = this.controller.axes[2];
            this.axes[3] = this.controller.axes[3];
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
        }
        else {
            for (let i = 0; i < this.screenPad.keysPressed.length; i++) {
                this.keysPressed[i] = this.screenPad.keysPressed[i];
            }
            this.screenPad.reinitOctaveButtons();
        }
    }

    #setUIButtons() {
        if (this.controller === undefined || this.controller === null) {
            document.getElementById('button_lt').style.display = 'none';
            document.getElementById('button_rt').style.display = 'none';
            document.getElementById('button_lb').style.display = 'none';
            document.getElementById('button_a').style.display = 'none';
            document.getElementById('button_b').style.display = 'none';
            document.getElementById('button_x').style.display = 'none';
            document.getElementById('button_up').style.display = 'none';
        }
        else {
            document.getElementById('button_lt').style.display = 'block';
            document.getElementById('button_rt').style.display = 'block';
            document.getElementById('button_lb').style.display = 'block';
            document.getElementById('button_a').style.display = 'block';
            document.getElementById('button_b').style.display = 'block';
            document.getElementById('button_x').style.display = 'block';
            document.getElementById('button_up').style.display = 'block';
        }
    }
}

export { Controllers };