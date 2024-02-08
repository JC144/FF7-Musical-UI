
class App {
    constructor(audioContext) {

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

            let newLeftNote = this.getNote(this.octave, 1, controller.axes[0], controller.axes[1]);
            let newRightNote = this.getNote(this.octave, 0, controller.axes[2], controller.axes[3]);

            this.leftNote = this.handleNote(newLeftNote, this.leftNote);
            this.rightNote = this.handleNote(newRightNote, this.rightNote);

            this.moveElement(leftAxis, controller.axes[0], controller.axes[1]);
            this.moveElement(rightAxis, controller.axes[2], controller.axes[3]);
        }
        (window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame)(this.updateStatus.bind(this));
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

    getNote(octave, minorscale, x, y) {
        if (y > 0.5 && x < 0.5 && x > -0.5) {
            //Do
            return { key: octave * 12 + 0 - minorscale };
        }
        else if (x > 0.5 && y > 0.5) {
            //Re
            return { key: octave * 12 + 2 - minorscale };
        }
        else if (x > 0.5 && y < 0.5 && y > -0.5) {
            //Mi
            return { key: octave * 12 + 4 - minorscale };
        }
        else if (x > 0.5 && y < -0.5) {
            //Fa
            return { key: octave * 12 + 5 - minorscale };
        }
        else if (y < -0.5 && x < 0.5 && x > -0.5) {
            //Sol
            return { key: octave * 12 + 7 - minorscale };
        }
        else if (x < -0.5 && y < -0.5) {
            //La
            return { key: octave * 12 + 9 - minorscale };
        }
        else if (x < -0.5 && y < 0.5 && y > -0.5) {
            //Si
            return { key: octave * 12 + 11 - minorscale };
        }
        else if (x < -0.5 && y > 0.5) {
            //Do'
            return { key: octave * 12 + 12 - minorscale };
        }
        else {
            return null;
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