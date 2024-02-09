class Notes {
    constructor(audio) {
        this.audio = audio;
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
    }

    incrementOctave() {
        if (this.octave < 6) {
            this.octave++;
        }
    }

    decrementOctave() {
        if (this.octave > 1) {
            this.octave--;
        }
    }

    reinitializeOctave() {
        this.octave = 4;
    }

    findAndPlayCorrespondingNotes(leftCurrentTone, rightCurrentTone, sticksAxes) {
        let newLeftNote = this.#getNote(this.octave, this.leftNotes[leftCurrentTone], sticksAxes[0], sticksAxes[1]);
        this.leftNote = this.#handleNote(newLeftNote, this.leftNote);

        let newRightNote = this.#getNote(this.octave, this.rightNotes[rightCurrentTone], sticksAxes[2], sticksAxes[3]);
        this.rightNote = this.#handleNote(newRightNote, this.rightNote);
    }

    #handleNote(newNote, previousNote) {
        if (!newNote && previousNote && previousNote.envelope) {
            previousNote = this.audio.stopNote(previousNote);
        }

        if (newNote && (!previousNote || newNote.key !== previousNote.key)) {
            if (previousNote && previousNote.envelope) {
                previousNote = this.audio.stopNote(previousNote);
            }
            previousNote = this.audio.playNote(newNote);
        }
        return previousNote;
    }

    #getNote(octave, notes, x, y) {
        let indexNote = -1;
        let angle = this.#calculateAngle(x, y);
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

    #calculateAngle(x, y) {
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
}
export { Notes };