class Notes {
    constructor(audio) {
        this.audio = audio;
        this.chord = 4;
        this.leftNotes = [
            [
                { key: [0, 4, 7], name: { western: "C", solfege: "Do" }, domId: "left_note_0" },
                { key: [2, 6, 9], name: { western: "D", solfege: "Re" }, domId: "left_note_1" },
                { key: [4, 8, 11], name: { western: "E", solfege: "Mi" }, domId: "left_note_2" },
                { key: [5, 9, 0], name: { western: "F", solfege: "Fa" }, domId: "left_note_3" },
                { key: [7, 11, 2], name: { western: "G", solfege: "Sol" }, domId: "left_note_4" },
                { key: [9, 1, 4], name: { western: "A", solfege: "La" }, domId: "left_note_5" },
                { key: [11, 3, 6], name: { western: "B", solfege: "Si" }, domId: "left_note_6" },
                { key: null, name: null, domId: "left_note_7" }
            ],
            [
                { key: [0, 4, 8], name: { western: "C", solfege: "Do" }, domId: "left_note_0" },
                { key: [2, 6, 10], name: { western: "D", solfege: "Re" }, domId: "left_note_1" },
                { key: [4, 8, 12], name: { western: "E", solfege: "Mi" }, domId: "left_note_2" },
                { key: [5, 9, 1], name: { western: "F", solfege: "Fa" }, domId: "left_note_3" },
                { key: [7, 11, 3], name: { western: "G", solfege: "Sol" }, domId: "left_note_4" },
                { key: [9, 1, 5], name: { western: "A", solfege: "La" }, domId: "left_note_5" },
                { key: [11, 3, 7], name: { western: "B", solfege: "Si" }, domId: "left_note_6" },
                { key: null, name: null, domId: "left_note_7" }
            ],
            [
                { key: [0, 3, 6], name: { western: "C", solfege: "Do" }, domId: "left_note_0" },
                { key: [2, 5, 8], name: { western: "D", solfege: "Re" }, domId: "left_note_1" },
                { key: [4, 7, 10], name: { western: "E", solfege: "Mi" }, domId: "left_note_2" },
                { key: [5, 8, -1], name: { western: "F", solfege: "Fa" }, domId: "left_note_3" },
                { key: [7, 10, 1], name: { western: "G", solfege: "Sol" }, domId: "left_note_4" },
                { key: [9, 0, 3], name: { western: "A", solfege: "La" }, domId: "left_note_5" },
                { key: [11, 2, 5], name: { western: "B", solfege: "Si" }, domId: "left_note_6" },
                { key: null, name: null, domId: "left_note_7" }
            ],
            [
                { key: [0, 3, 7], name: { western: "Cm", solfege: "Do m" }, domId: "left_note_0" },
                { key: [2, 5, 9], name: { western: "Dm", solfege: "Re m" }, domId: "left_note_1" },
                { key: [4, 7, 11], name: { western: "Em", solfege: "Mi m" }, domId: "left_note_2" },
                { key: [5, 8, 0], name: { western: "Fm", solfege: "Fa m" }, domId: "left_note_3" },
                { key: [7, 10, 2], name: { western: "Gm", solfege: "Sol m" }, domId: "left_note_4" },
                { key: [9, 0, 4], name: { western: "Am", solfege: "La m" }, domId: "left_note_5" },
                { key: [11, 2, 6], name: { western: "Bm", solfege: "Si m" }, domId: "left_note_6" },
                { key: null, name: null, domId: "left_note_7" }
            ],
        ];

        this.rightNotes = [
            [
                { key: 0, name: { western: "C", solfege: "Do" }, domId: "right_note_0" },
                { key: 2, name: { western: "D", solfege: "Re" }, domId: "right_note_1" },
                { key: 4, name: { western: "E", solfege: "Mi" }, domId: "right_note_2" },
                { key: 5, name: { western: "F", solfege: "Fa" }, domId: "right_note_3" },
                { key: 7, name: { western: "G", solfege: "Sol" }, domId: "right_note_4" },
                { key: 9, name: { western: "A", solfege: "La" }, domId: "right_note_5" },
                { key: 11, name: { western: "B", solfege: "Si" }, domId: "right_note_6" },
                { key: 12, name: { western: "C'", solfege: "Do'" }, domId: "right_note_7" }
            ],
            [
                { key: null, name: null, domId: "right_note_0" },
                { key: 1, name: { western: "D♭", solfege: "Re♭" }, domId: "right_note_1" },
                { key: 3, name: { western: "E♭", solfege: "Mi♭" }, domId: "right_note_2" },
                { key: null, name: null, domId: "right_note_3" },
                { key: 6, name: { western: "G♭", solfege: "Sol♭" }, domId: "right_note_4" },
                { key: 8, name: { western: "A♭", solfege: "La♭" }, domId: "right_note_5" },
                { key: 10, name: { western: "B♭", solfege: "Si♭" }, domId: "right_note_6" },
                { key: null, name: null, domId: "right_note_7" }
            ],
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

    incrementChord() {
        if (this.chord < 9) {
            this.chord++;
        }
    }

    decrementChord() {
        if (this.chord > 1) {
            this.chord--;
        }
    }

    reinitializeChord() {
        this.chord = 4;
    }

    findAndPlayCorrespondingNotes(leftCurrentTone, rightCurrentTone, sticksAxes) {
        let newLeftNote = this.#getChord(this.#getIndex(sticksAxes[0], sticksAxes[1]), this.chord, this.leftNotes[leftCurrentTone]);
        this.leftNote = this.#handleChord(newLeftNote, this.leftNote);

        let newRightNote = this.#getNote(this.#getIndex(sticksAxes[2], sticksAxes[3]), this.octave, this.rightNotes[rightCurrentTone]);
        this.rightNote = this.#handleNote(newRightNote, this.rightNote);
    }

    #handleChord(newNote, previousNote) {
        if (!newNote && previousNote && previousNote.envelope) {
            previousNote = this.audio.stopChord(previousNote);
        }

        if (newNote && newNote.key && (!previousNote || !previousNote.key || (newNote.key.length != previousNote.key.length || !newNote.key.every((element, index) => element === previousNote.key[index])))) {
            if (previousNote && previousNote.envelope) {
                previousNote = this.audio.stopChord(previousNote);
            }
            previousNote = this.audio.playChord(newNote);
        }
        return previousNote;
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

    #getIndex(x, y) {
        let index = -1;
        let angle = this.#calculateAngle(x, y);
        let distance = Math.sqrt(x * x + y * y);

        if (distance > 0.5) {
            if (angle > 247.5 && angle < 292.5) {
                index = 0;
            }
            else if (angle > 292.5 && angle < 337.5) {
                index = 1;
            }
            else if (angle > 337.5 || angle < 22.5) {
                index = 2;
            }
            else if (angle > 22.5 && angle < 67.5) {
                index = 3;
            }
            else if (angle > 67.5 && angle < 112.5) {
                index = 4;
            }
            else if (angle > 112.5 && angle < 157.5) {
                index = 5;
            }
            else if (angle > 157.5 && angle < 202.5) {
                index = 6;
            }
            else if (angle > 202.5 && angle < 247.5) {
                index = 7;
            }

            return index;
        }
    }

    #getNote(index, octave, notes) {
        if (index != -1 && notes[index]) {
            return { key: octave * 12 + notes[index].key };
        }
    }

    #getChord(index, chord, notes) {
        if (index != -1 && notes[index] && notes[index].key) {
            return { key: notes[index].key.map(c => chord * 12 + c) };
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