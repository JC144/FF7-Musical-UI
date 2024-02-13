class Ui {
    constructor(leftNotes, rightNotes) {
        this.leftNotes = leftNotes;
        this.rightNotes = rightNotes;
        let languagePicker = document.getElementById("languages");
        this.language = languagePicker.value;
        this.#translate();
    }

    draw(leftTone, rightTone, octave, chord, sticksAxes) {
        let languagePicker = document.getElementById("languages");
        if (this.language != languagePicker.value) {
            this.language = languagePicker.value;
            this.#translate();
        }

        var leftAxis = document.getElementById("leftAxis");
        var rightAxis = document.getElementById("rightAxis");

        for (let i = 1; i <= this.leftNotes.length - 1; i++) {
            document.getElementById('left_tone_' + i).style.backgroundColor = '#FFF';
        }
        for (let i = 1; i <= this.rightNotes.length - 1; i++) {
            document.getElementById('right_tone_' + i).style.backgroundColor = '#FFF';
        }
        if (leftTone > 0) {
            document.getElementById('left_tone_' + leftTone).style.backgroundColor = 'lightblue';
        }
        if (rightTone > 0) {
            document.getElementById('right_tone_' + rightTone).style.backgroundColor = 'lightblue';
        }

        for (let i = 0; i < 6; i++) {
            document.getElementById('octave-bullet-' + i).style.backgroundColor = 'white';
        }
        document.getElementById('octave-bullet-' + (octave - 1)).style.backgroundColor = 'black';

        for (let i = 0; i < 9; i++) {
            document.getElementById('chord-bullet-' + i).style.backgroundColor = 'white';
        }
        document.getElementById('chord-bullet-' + (chord - 1)).style.backgroundColor = 'black';

        this.leftNotes[leftTone].forEach(note => {
            document.getElementById(note.domId).innerText = this.#getNoteName(note);
        });
        this.rightNotes[rightTone].forEach(note => {
            document.getElementById(note.domId).innerText = this.#getNoteName(note);
        });

        this.#moveElement(leftAxis, sticksAxes[0], sticksAxes[1]);
        this.#moveElement(rightAxis, sticksAxes[2], sticksAxes[3]);
    }

    #getNoteName(note) {
        let noteName = '';
        if (note !== null && note.name !== null) {
            if (this.language.includes("en")) {
                noteName = note.name.western;
            }
            else {
                noteName = note.name.solfege;
            }
        }
        return noteName;
    }

    #moveElement(element, x, y) {
        const newX = (x * 50) - 50;
        const newY = (y * 50) - 50;

        // Apply the new transformation
        element.style.transform = 'translate(' + newX + '%, ' + newY + '%)';
    }

    #translate() {
        if (this.language.includes("en")) {
            this.#translateInternal(en);
        } else if (this.language.includes("fr")) {
            this.#translateInternal(fr);
        } else if (this.language.includes("es")) {
            this.#translateInternal(es);
        }
    }

    #translateInternal(language) {
        //For each properties in language object
        for (var key in language) {
            //Get the element with the id of the property
            var element = document.getElementById(key + '_label');
            //If the element exists
            if (element) {
                //Set the innerHTML of the element to the value of the property
                element.innerHTML = language[key];
            }
        }
    }
}
export { Ui };