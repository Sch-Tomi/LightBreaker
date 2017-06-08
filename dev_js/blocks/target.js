class Target extends Mirror {
    constructor(heading, x, y, moving, rotating) {
        super(heading, x, y, moving, rotating, "img/blocks/cel.png")

        this._hit = false

    }

    hitStatus() {
        return this._hit
    }

}
