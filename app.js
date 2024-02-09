
class App {
    constructor(audioContext) {
        this.keysPressed = [];
        this.leftNotes = [
            [{ key: 0, name: "Do", domId: "left_note_0" }, { key: 2, name: "Re", domId: "left_note_1" }, { key: 4, name: "Mi", domId: "left_note_2" }, { key: 5, name: "Fa", domId: "left_note_3" }, { key: 7, name: "Sol", domId: "left_note_4" }, { key: 9, name: "La", domId: "left_note_5" }, { key: 11, name: "Si", domId: "left_note_6" }, { key: null, name: "", domId: "left_note_7" }],
            [{ key: -1, name: "Do m", domId: "left_note_0" }, { key: 1, name: "Re m", domId: "left_note_1" }, { key: 3, name: "Mi m", domId: "left_note_2" }, { key: 4, name: "Fa m", domId: "left_note_3" }, { key: 6, name: "Sol m", domId: "left_note_4" }, { key: 8, name: "La m", domId: "left_note_5" }, { key: 10, name: "Si m", domId: "left_note_6" }, { key: null, name: "", domId: "left_note_7" }],
            [{ key: null, name: "", domId: "left_note_0" }, { key: 1, name: "Re♭", domId: "left_note_1" }, { key: 3, name: "Mi♭", domId: "left_note_2" }, { key: null, name: "", domId: "left_note_3" }, { key: 6, name: "Sol♭", domId: "left_note_4" }, { key: 8, name: "La♭", domId: "left_note_5" }, { key: 10, name: "Si♭", domId: "left_note_6" }, { key: null, name: "", domId: "left_note_7" }],
            [{ key: -1, name: "Do m", domId: "left_note_0" }, { key: 1, name: "Re m", domId: "left_note_1" }, { key: 3, name: "Mi m", domId: "left_note_2" }, { key: 4, name: "Fa m", domId: "left_note_3" }, { key: 6, name: "Sol m", domId: "left_note_4" }, { key: 8, name: "La m", domId: "left_note_5" }, { key: 10, name: "Si m", domId: "left_note_6" }, { key: null, name: "", domId: "left_note_7" }],
        ];

        this.rightNotes = [
            [{ key: 0, name: "Do", domId: "right_note_0" }, { key: 2, name: "Re", domId: "right_note_1" }, { key: 4, name: "Mi", domId: "right_note_2" }, { key: 5, name: "Fa", domId: "right_note_3" }, { key: 7, name: "Sol", domId: "right_note_4" }, { key: 9, name: "La", domId: "right_note_5" }, { key: 11, name: "Si", domId: "right_note_6" }, { key: 12, name: "Do'", domId: "right_note_7" }],
            [{ key: null, name: "", domId: "right_note_0" }, { key: 1, name: "Re♭", domId: "right_note_1" }, { key: 3, name: "Mi♭", domId: "right_note_2" }, { key: null, name: "", domId: "right_note_3" }, { key: 6, name: "Sol♭", domId: "right_note_4" }, { key: 8, name: "La♭", domId: "right_note_5" }, { key: 10, name: "Si♭", domId: "right_note_6" }, { key: null, name: "", domId: "right_note_7" }]
        ];

        this.leftNote = {};
        this.rightNote = {};
        this.octave = 4;

        this.audioContext = audioContext;
        this.player = new WebAudioFontPlayer();
        this.player.loader.decodeAfterLoading(audioContext, '_tone_0000_Chaos_sf2_file');

        this.haveEvents = 'GamepadEvent' in window;
        this.haveWebkitEvents = 'WebKitGamepadEvent' in window;
        this.controllers = {};
        this.rAF = (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame);
        this.initEventHandlers();
        this.draw(0, 0, this.octave);
    }

    connecthandler(e) {
        this.addgamepad(e.gamepad);
    }

    addgamepad(gamepad) {
        this.controllers[gamepad.index] = gamepad;

        //init buttons state
        this.keysPressed = [];
        for (let i = 0; i < gamepad.buttons.length; i++) {
            this.keysPressed.push(false);
        }

        (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame)(this.updateStatus.bind(this));
    }

    disconnecthandler(e) {
        this.removegamepad(e.gamepad);
    }

    removegamepad(gamepad) {
        delete this.controllers[gamepad.index];
    }

    updateStatus() {
        this.scangamepads();
        if (this.controllers[0]) {
            var controller = this.controllers[0];

            let leftTone = 0;

            if (controller.buttons[12].pressed) {
                leftTone = 1;
            }
            else if (controller.buttons[6].pressed) {
                leftTone = 2;
            }
            else if (controller.buttons[4].pressed) {
                leftTone = 3;
            }

            if (controller.buttons[1].pressed && this.keysPressed[1] === false) {
                this.keysPressed[1] = true;
                if (this.octave < 6) {
                    this.octave++;
                }
            }
            if (controller.buttons[2].pressed && this.keysPressed[2] === false) {
                this.keysPressed[2] = true;
                if (this.octave > 1) {
                    this.octave--;
                }
            }
            if (controller.buttons[0].pressed) {
                this.octave = 4;
            }

            //Reinit buttons state
            for (let i = 0; i < controller.buttons.length; i++) {
                this.keysPressed[i] = controller.buttons[i].pressed;
            }

            let rightTone = (controller.buttons[7].pressed) ? 1 : 0;

            var leftAxis = document.getElementById("leftAxis");
            var rightAxis = document.getElementById("rightAxis");

            let newLeftNote = this.getNote(this.octave, this.leftNotes[leftTone], controller.axes[0], controller.axes[1]);
            let newRightNote = this.getNote(this.octave, this.rightNotes[rightTone], controller.axes[2], controller.axes[3]);

            this.leftNote = this.handleNote(newLeftNote, this.leftNote);
            this.rightNote = this.handleNote(newRightNote, this.rightNote);
            this.draw(leftTone, rightTone, this.octave);
            this.moveElement(leftAxis, controller.axes[0], controller.axes[1]);
            this.moveElement(rightAxis, controller.axes[2], controller.axes[3]);
        }
        (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame)(this.updateStatus.bind(this));
    }

    draw(leftTone, rightTone, octave) {
        for (let i = 1; i <= this.leftNotes.length - 1; i++) {
            document.getElementById('left_tone_' + i).style.opacity = 0.45;
        }
        for (let i = 1; i <= this.rightNotes.length - 1; i++) {
            document.getElementById('right_tone_' + i).style.opacity = 0.45;
        }
        if (leftTone > 0) {
            document.getElementById('left_tone_' + leftTone).style.opacity = 0.75;
        }
        if (rightTone > 0) {
            document.getElementById('right_tone_' + rightTone).style.opacity = 0.75;
        }

        for (let i = 0; i < 6; i++) {
            document.getElementById('octave-bullet-' + i).style.backgroundColor = 'black';
        }

        document.getElementById('octave-bullet-' + (octave - 1)).style.backgroundColor = 'white';

        this.leftNotes[leftTone].forEach(note => {
            document.getElementById(note.domId).innerText = note.name;
        });
        this.rightNotes[rightTone].forEach(note => {
            document.getElementById(note.domId).innerText = note.name;
        });
    }

    scangamepads() {
        var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gamepads.length; i++) {
            if (gamepads[i] && (gamepads[i].index in this.controllers)) {
                this.controllers[gamepads[i].index] = gamepads[i];
            }
        }
    }

    initEventHandlers() {
        if (this.haveEvents) {
            window.addEventListener("gamepadconnected", this.connecthandler.bind(this));
            window.addEventListener("gamepaddisconnected", this.disconnecthandler.bind(this));
        } else if (this.haveWebkitEvents) {
            window.addEventListener("webkitgamepadconnected", this.connecthandler.bind(this));
            window.addEventListener("webkitgamepaddisconnected", this.disconnecthandler.bind(this));
        } else {
            setInterval(this.scangamepads, 500).bind(this);
        }
    }

    moveElement(element, x, y) {
        const newX = (x * 50) - 50;
        const newY = (y * 50) - 50;

        // Apply the new transformation
        element.style.transform = 'translate(' + newX + '%, ' + newY + '%)';
    }

    handleNote(newNote, previousNote) {
        if (!newNote && previousNote && previousNote.envelope) {
            previousNote = this.stopNote(previousNote);
        }

        if (newNote && (!previousNote || newNote.key !== previousNote.key)) {
            if (previousNote && previousNote.envelope) {
                previousNote = this.stopNote(previousNote);
            }
            previousNote = this.playNote(newNote);
        }
        return previousNote;
    }

    getNote(octave, notes, x, y) {
        let indexNote = -1;
        let angle = this.calculateAngle(x, y);
        let distance = Math.sqrt(x * x + y * y);

        if (distance > 0.5) {
            if (angle > 247.5 && angle < 292.5) {
                indexNote = 0;
            }
            else if (angle > 292.5 && angle < 337.5) {
                indexNote = 1;
            }
            else if (angle > 337.5 || angle < 22.5) {
                indexNote = 2;
            }
            else if (angle > 22.5 && angle < 67.5) {
                indexNote = 3;
            }
            else if (angle > 67.5 && angle < 112.5) {
                indexNote = 4;
            }
            else if (angle > 112.5 && angle < 157.5) {
                indexNote = 5;
            }
            else if (angle > 157.5 && angle < 202.5) {
                indexNote = 6;
            }
            else if (angle > 202.5 && angle < 247.5) {
                indexNote = 7;
            }

            if (indexNote === -1 || notes[indexNote].key === null) {
                return null;
            }

            return { key: octave * 12 + notes[indexNote].key };
        }
    }

    calculateAngle(x, y) {
        // Calculate the angle in radians
        let angleRadians = Math.atan2(y, x);

        // Convert radians to degrees
        let angleDegrees = angleRadians * (180 / Math.PI);

        // Make sure the angle is positive
        if (angleDegrees < 0) {
            angleDegrees += 360;
        }

        return angleDegrees;
    }

    playNote(note) {
        note.envelope = this.player.queueWaveTable(this.audioContext, this.audioContext.destination, _tone_0000_Chaos_sf2_file, 0, note.key, 999, true);
        return note;
    }

    stopNote(note) {
        if (note.envelope) {
            note.envelope.cancel();
            note.envelope = null;
        }
        return null;
    }
}
export { App };