class ScreenPad {
    constructor() {
        this.keysPressed = [];
        for (let i = 0; i < 17; i++) {
            this.keysPressed[i] = false;
        }

        this.leftTouchID = null;
        this.leftStartAxes = [0, 0];
        this.leftAxes = [0, 0];

        this.rightTouchID = null;
        this.rightStartAxes = [0, 0];
        this.rightAxes = [0, 0];

        this.leftInstrument = document.getElementById('leftInstrument');
        this.leftAxis = document.getElementById('leftAxis');
        this.rightInstrument = document.getElementById('rightInstrument');
        this.rightAxis = document.getElementById('rightAxis');

        this.leftAxis.addEventListener('touchstart', this.#touchStart.bind(this));
        this.rightAxis.addEventListener('touchstart', this.#touchStart.bind(this));
        this.leftAxis.addEventListener('mousedown', this.#mouseStart.bind(this));
        this.rightAxis.addEventListener('mousedown', this.#mouseStart.bind(this));

        this.leftInstrument.addEventListener('touchmove', this.#touchMove.bind(this));
        this.rightInstrument.addEventListener('touchmove', this.#touchMove.bind(this));
        this.leftInstrument.addEventListener('mousemove', this.#mouseMove.bind(this));
        this.rightInstrument.addEventListener('mousemove', this.#mouseMove.bind(this));

        this.leftInstrument.addEventListener('touchend', this.#touchEnd.bind(this));
        this.rightInstrument.addEventListener('touchend', this.#touchEnd.bind(this));
        this.leftInstrument.addEventListener('mouseup', this.#mouseEnd.bind(this));
        this.rightInstrument.addEventListener('mouseup', this.#mouseEnd.bind(this));

        this.leftInstrument.addEventListener('touchcancel', this.#touchEnd.bind(this));
        this.rightInstrument.addEventListener('touchcancel', this.#touchEnd.bind(this));

        document.getElementById('left_tone_1').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('left_tone_2').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('left_tone_3').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('right_tone_1').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('octaveDown').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('octaveUp').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('octaveInit').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('chordDown').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('chordUp').addEventListener('click', this.#buttonClicked.bind(this));
        document.getElementById('chordInit').addEventListener('click', this.#buttonClicked.bind(this));

    }

    #mouseStart(e) {
        e.preventDefault();
        if (e.currentTarget.id == "leftAxis") {
            this.leftTouchID = true;
            this.leftStartAxes = [e.clientX, e.clientY];
        }
        else if (e.currentTarget.id == "rightAxis") {
            this.rightTouchID = true;
            this.rightStartAxes = [e.clientX, e.clientY];
        }
    }

    #mouseMove(e) {
        if (this.leftTouchID) {
            e.preventDefault();
            this.leftAxes = [this.#prepareCoordinate(e.clientX - this.leftStartAxes[0]), this.#prepareCoordinate(e.clientY - this.leftStartAxes[1])];
        }
        else if (this.rightTouchID) {
            e.preventDefault();
            this.rightAxes = [this.#prepareCoordinate(e.clientX - this.rightStartAxes[0]), this.#prepareCoordinate(e.clientY - this.rightStartAxes[1])];
        }
    }

    #mouseEnd(e) {
        if (this.leftTouchID) {
            e.preventDefault();
            this.leftTouchID = null;
            this.leftStartAxes = [0, 0];
            this.leftAxes = [0, 0];
        }

        if (this.rightTouchID) {
            e.preventDefault();
            this.rightTouchID = null;
            this.rightStartAxes = [0, 0];
            this.rightAxes = [0, 0];
        }
    }

    #touchStart(e) {
        for (const touch of e.touches) {
            if (e.currentTarget.id == "leftAxis" && this.leftTouchID === null && touch.identifier != this.rightTouchID) {
                this.leftTouchID = touch.identifier;
                this.leftStartAxes = [touch.clientX, touch.clientY];
            }
            else if (e.currentTarget.id == "rightAxis" && this.rightTouchID === null && touch.identifier != this.leftTouchID) {
                this.rightTouchID = touch.identifier;
                this.rightStartAxes = [touch.clientX, touch.clientY];
            }
        }
    }

    #touchMove(e) {
        e.preventDefault();
        if (this.leftTouchID !== null) {
            const leftTouch = this.#getTouchByID(e.touches, this.leftTouchID);
            if (leftTouch) {
                this.leftAxes = [this.#prepareCoordinate(leftTouch.clientX - this.leftStartAxes[0]), this.#prepareCoordinate(leftTouch.clientY - this.leftStartAxes[1])];
            }
        }

        if (this.rightTouchID !== null) {
            const rightTouch = this.#getTouchByID(e.touches, this.rightTouchID);
            if (rightTouch) {
                this.rightAxes = [this.#prepareCoordinate(rightTouch.clientX - this.rightStartAxes[0]), this.#prepareCoordinate(rightTouch.clientY - this.rightStartAxes[1])];
            }
        }
    }

    #touchEnd(e) {
        if (this.leftTouchID !== null || this.rightTouchID !== null) {
            for (const touch of e.changedTouches) {
                if (touch.identifier === this.leftTouchID) {
                    this.leftTouchID = null;
                    this.leftStartAxes = [0, 0];
                    this.leftAxes = [0, 0];
                } else if (touch.identifier === this.rightTouchID) {
                    this.rightTouchID = null;
                    this.rightStartAxes = [0, 0];
                    this.rightAxes = [0, 0];
                }
            }
        }
    }

    #getTouchByID(touchList, id) {
        for (const touch of touchList) {
            if (touch.identifier === id) {
                return touch;
            }
        }
        return null;
    }

    #prepareCoordinate(val) {
        val = val / 50;
        if (val < -1) {
            return -1;
        }
        else if (val > 1) {
            return 1;
        }
        else {
            return val;
        }
    }

    #buttonClicked(e) {
        const id = e.currentTarget.id;
        if (id.includes('left_tone_1')) {
            this.keysPressed[6] = false;
            this.keysPressed[4] = false;
            this.keysPressed[12] = !this.keysPressed[12];
        }
        else if (id.includes('left_tone_2')) {
            this.keysPressed[12] = false;
            this.keysPressed[4] = false;
            this.keysPressed[6] = !this.keysPressed[6];
        }
        else if (id.includes('left_tone_3')) {
            this.keysPressed[12] = false;
            this.keysPressed[6] = false;
            this.keysPressed[4] = !this.keysPressed[4];
        }
        else if (id.includes('right_tone_1')) {
            this.keysPressed[7] = !this.keysPressed[7];
        }

        if (id.includes('octaveDown')) {
            this.keysPressed[2] = true;
        }
        else if (id.includes('octaveUp')) {
            this.keysPressed[1] = true;
        }
        else if (id.includes('octaveInit')) {
            this.keysPressed[0] = true;
        }

        if (id.includes('chordDown')) {
            this.keysPressed[14] = true;
        }
        else if (id.includes('chordUp')) {
            this.keysPressed[15] = true;
        }
        else if (id.includes('chordInit')) {
            this.keysPressed[13] = true;
        }
    }

    reinitOctaveButtons() {
        this.keysPressed[0] = false;
        this.keysPressed[1] = false;
        this.keysPressed[2] = false;
    }

    reinitChordButtons() {
        this.keysPressed[13] = false;
        this.keysPressed[14] = false;
        this.keysPressed[15] = false;
    }
}
export { ScreenPad };