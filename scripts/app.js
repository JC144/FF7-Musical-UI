import { Ui } from './ui.js';
import { Notes } from './notes.js';
import { Controllers } from './controllers/controllers.js';

class App {
    constructor(audio) {
        this.audio = audio;
        this.notes = new Notes(audio);
        this.controllers = new Controllers(this.updateStatus.bind(this));
        this.previousKeysPressed = this.controllers.keysPressed;

        this.rAF = (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame);

        this.ui = new Ui(this.notes.leftNotes, this.notes.rightNotes);
        this.ui.draw(0, 0, this.notes.octave, [0, 0, 0, 0]);
        this.updateStatus();
    }

    updateStatus() {
        this.controllers.updateStatus();

        let leftCurrentTone = 0;

        if (this.controllers.keysPressed[12]) {
            leftCurrentTone = 1;
        }
        else if (this.controllers.keysPressed[6]) {
            leftCurrentTone = 2;
        }
        else if (this.controllers.keysPressed[4]) {
            leftCurrentTone = 3;
        }

        if (this.controllers.keysPressed[1] && this.previousKeysPressed[1] === false) {
            this.controllers.keysPressed[1] = true;
            this.notes.incrementOctave();
        }
        if (this.controllers.keysPressed[2] && this.previousKeysPressed[2] === false) {
            this.controllers.keysPressed[2] = true;
            this.notes.decrementOctave();
        }
        if (this.controllers.keysPressed[0]) {
            this.notes.reinitializeOctave();
        }

        let rightCurrentTone = (this.controllers.keysPressed[7]) ? 1 : 0;

        this.previousKeysPressed = this.controllers.keysPressed;

        this.notes.findAndPlayCorrespondingNotes(leftCurrentTone, rightCurrentTone, this.controllers.axes);

        this.ui.draw(leftCurrentTone, rightCurrentTone, this.notes.octave, this.controllers.axes);

        (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame)(this.updateStatus.bind(this));
    }
}
export { App };