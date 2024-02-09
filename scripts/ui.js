class Ui {
    constructor(leftNotes, rightNotes) {
        this.leftNotes = leftNotes;
        this.rightNotes = rightNotes;
    }

    draw(leftTone, rightTone, octave, sticksAxes) {

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

        this.leftNotes[leftTone].forEach(note => {
            document.getElementById(note.domId).innerText = note.name;
        });
        this.rightNotes[rightTone].forEach(note => {
            document.getElementById(note.domId).innerText = note.name;
        });

        this.#moveElement(leftAxis, sticksAxes[0], sticksAxes[1]);
        this.#moveElement(rightAxis, sticksAxes[2], sticksAxes[3]);
    }

    #moveElement(element, x, y) {
        const newX = (x * 50) - 50;
        const newY = (y * 50) - 50;

        // Apply the new transformation
        element.style.transform = 'translate(' + newX + '%, ' + newY + '%)';
    }
}
export { Ui };