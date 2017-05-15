class CheckPoint extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("/img/blocks/ellenorzo.png", heading, x, y, moving, rotating)

        this._hit = false
    }

    get_newDir(dir) {
        this._hit = true
        return [dir]
    }

    hitStatus() {
        return this._hit
    }

}
