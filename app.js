
class App {
    constructor(audioContext) {

        this.leftNotes = [
            [{ key: -1, name: "Do m", domId: "left_note_0" }, { key: 1, name: "Re m", domId: "left_note_1" }, { key: 3, name: "Mi m", domId: "left_note_2" }, { key: 4, name: "Fa m", domId: "left_note_3" }, { key: 6, name: "Sol m", domId: "left_note_4" }, { key: 8, name: "La m", domId: "left_note_5" }, { key: 10, name: "Si m", domId: "left_note_6" }, { key: null, name: "", domId: "left_note_7" }],
            [{ key: 0, name: "" }, { key: 2, name: "" }, { key: 4, name: "" }, { key: 6, name: "" }, { key: 8, name: "" }, { key: 10, name: "" }, { key: 23, name: "" }],
            [{ key: 0, name: "" }, { key: 2, name: "" }, { key: 4, name: "" }, { key: 6, name: "" }, { key: 8, name: "" }, { key: 10, name: "" }, { key: 23, name: "" }]
        ];

        this.rightNotes = [
            [{ key: 0, name: "Do", domId: "right_note_0" }, { key: 2, name: "Re", domId: "right_note_1" }, { key: 4, name: "Mi", domId: "right_note_2" }, { key: 5, name: "Fa", domId: "right_note_3" }, { key: 7, name: "Sol", domId: "right_note_4" }, { key: 9, name: "La", domId: "right_note_5" }, { key: 11, name: "Si", domId: "right_note_6" }, { key: 12, name: "Do'", domId: "right_note_7" }],
            [{ key: 0, name: "" }, { key: 2, name: "" }, { key: 4, name: "" }, { key: 6, name: "" }, { key: 8, name: "" }, { key: 10, name: "" }, { key: 23, name: "" }, { key: 23, name: "Do'" }]
        ];

        this.leftNote = {};
        this.rightNote = {};
        this.octave = 5;

        this.audioContext = audioContext;
        this.player = new WebAudioFontPlayer();
        this.player.loader.decodeAfterLoading(audioContext, '_tone_0750_Chaos_sf2_file');

        for (var i = 0; i < _tone_0750_Chaos_sf2_file.zones.length; i++) {
            _tone_0750_Chaos_sf2_file.zones[i].ahdsr = false;
        }

        this.haveEvents = 'GamepadEvent' in window;
        this.haveWebkitEvents = 'WebKitGamepadEvent' in window;
        this.controllers = {};
        this.rAF = (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame);
        this.initEventHandlers();
        this.draw();
    }

    connecthandler(e) {
        this.addgamepad(e.gamepad);
    }

    addgamepad(gamepad) {
        this.controllers[gamepad.index] = gamepad;

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
        for (let j in this.controllers) {
            var controller = this.controllers[j];

            var leftAxis = document.getElementById("leftAxis");
            var rightAxis = document.getElementById("rightAxis");

            let newLeftNote = this.getNote(this.octave, this.leftNotes[0], controller.axes[0], controller.axes[1]);
            let newRightNote = this.getNote(this.octave, this.rightNotes[0], controller.axes[2], controller.axes[3]);

            this.leftNote = this.handleNote(newLeftNote, this.leftNote);
            this.rightNote = this.handleNote(newRightNote, this.rightNote);
            this.draw();
            this.moveElement(leftAxis, controller.axes[0], controller.axes[1]);
            this.moveElement(rightAxis, controller.axes[2], controller.axes[3]);
        }
        (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame)(this.updateStatus.bind(this));
    }

    draw() {
        this.leftNotes[0].forEach(note => {
            document.getElementById(note.domId).innerText = note.name;
        });
        this.rightNotes[0].forEach(note => {
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
        if (y < -0.5 && x < 0.2 && x > -0.2) {
            indexNote = 0;
        }
        else if (x > 0.5 && y < -0.5) {
            indexNote = 1;
        }
        else if (x > 0.5 && y < 0.2 && y > -0.2) {
            indexNote = 2;
        }
        else if (x > 0.5 && y > 0.5) {
            indexNote = 3;
        }
        else if (y > 0.5 && x < 0.2 && x > -0.2) {
            indexNote = 4;
        }
        else if (y > 0.5 && x < -0.5) {
            indexNote = 5;
        }
        else if (x < -0.5 && y < 0.2 && y > -0.2) {
            indexNote = 6;
        }
        else if (x < -0.5 && y < -0.5) {
            indexNote = 7;
        }
        if (indexNote === -1 || notes[indexNote].key === null) {
            return null;
        }
        else {
            return { key: octave * 12 + notes[indexNote].key };
        }
    }

    playNote(note) {
        note.envelope = this.player.queueWaveTable(this.audioContext, this.audioContext.destination, _tone_0750_Chaos_sf2_file, 0, note.key, 999, true);
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