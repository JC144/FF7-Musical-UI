import { Ui } from './ui.js';
import { Notes } from './notes.js';
import { GamePad } from './gamepad.js';

class App {
    constructor(audio) {
        this.audio = audio;
        this.notes = new Notes(audio);
        this.gamepad = new GamePad(this.updateStatus.bind(this));

        this.rAF = (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame);

        this.ui = new Ui(this.notes.leftNotes, this.notes.rightNotes);
        this.ui.draw(0, 0, this.notes.octave, [0, 0, 0, 0]);
    }

    updateStatus() {
        this.gamepad.scangamepads();
        var controller = this.gamepad.controllers[0];

        if (controller) {
            let leftCurrentTone = 0;

            if (controller.buttons[12].pressed) {
                leftCurrentTone = 1;
            }
            else if (controller.buttons[6].pressed) {
                leftCurrentTone = 2;
            }
            else if (controller.buttons[4].pressed) {
                leftCurrentTone = 3;
            }

            if (controller.buttons[1].pressed && this.gamepad.keysPressed[1] === false) {
                this.gamepad.keysPressed[1] = true;
                this.notes.incrementOctave();
            }
            if (controller.buttons[2].pressed && this.gamepad.keysPressed[2] === false) {
                this.gamepad.keysPressed[2] = true;
                this.notes.decrementOctave();
            }
            if (controller.buttons[0].pressed) {
                this.notes.reinitializeOctave();
            }

            let rightCurrentTone = (controller.buttons[7].pressed) ? 1 : 0;

            this.notes.findAndPlayCorrespondingNotes(leftCurrentTone, rightCurrentTone, controller.axes);

            this.gamepad.reinitiliazeKeysPressed();
            this.ui.draw(leftCurrentTone, rightCurrentTone, this.notes.octave, controller.axes);
        }

        (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame)(this.updateStatus.bind(this));
    }
}
export { App };