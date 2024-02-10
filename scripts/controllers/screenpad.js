class ScreenPad {
    constructor() {
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

        this.leftInstrument.addEventListener('touchmove', this.#touchMove.bind(this));
        this.rightInstrument.addEventListener('touchmove', this.#touchMove.bind(this));

        this.leftInstrument.addEventListener('touchend', this.#touchEnd.bind(this));
        this.rightInstrument.addEventListener('touchend', this.#touchEnd.bind(this));

        this.leftInstrument.addEventListener('touchcancel', this.#touchEnd.bind(this));
        this.rightInstrument.addEventListener('touchcancel', this.#touchEnd.bind(this));
    }

    #touchStart(e) {
        for (const touch of e.touches) {
            if (e.currentTarget.id == "leftAxis" && this.leftTouchID === null) {
                this.leftTouchID = touch.identifier;
                this.leftStartAxes = [touch.clientX, touch.clientY];
            }
            else if (e.currentTarget.id == "rightAxis" && this.rightTouchID === null) {
                this.rightTouchID = touch.identifier;
                this.rightStartAxes = [touch.clientX, touch.clientY];
            }
        }
    }

    #touchMove(e) {
        e.preventDefault();
        if (this.leftTouchID !== null) {
            const touch = this.#getTouchByID(e.touches, this.leftTouchID);
            if (touch) {
                this.leftAxes = [this.#prepareCoordinate(touch.clientX - this.leftStartAxes[0]), this.#prepareCoordinate(touch.clientY - this.leftStartAxes[1])];
            }
        }

        if (this.rightTouchID !== null) {
            const touch = this.#getTouchByID(e.touches, this.rightTouchID);
            if (touch) {
                this.rightAxes = [this.#prepareCoordinate(touch.clientX - this.rightStartAxes[0]), this.#prepareCoordinate(touch.clientY - this.rightStartAxes[1])];
            }
        }
    }

    #touchEnd(e) {
        if (this.leftTouchID !== null || this.rightTouchID !== null) {
            for (const touch of e.changedTouches) {
                if (touch.identifier === this.leftTouchID) {
                    this.leftTouchID = null;
                    this.leftAxes = [0, 0];
                } else if (touch.identifier === this.rightTouchID) {
                    this.rightTouchID = null;
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
        val = val / 100;
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
}
export { ScreenPad };