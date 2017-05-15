class HalfMirror extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("/img/blocks/felig.png", heading, x, y, moving, rotating)
    }

    get_newDir(dir) {

        var myDir = this._direction % 180
        var incomeDir = (dir + 180) % 360


        var newDir = null

        if (myDir == 0) {
            if (incomeDir == 0) {
                newDir = 270
            }
            if (incomeDir == 270) {
                newDir = 0
            }
            if (incomeDir == 90) {
                newDir = 180
            }
            if (incomeDir == 180) {
                newDir = 90
            }
        } else {
            if (incomeDir == 0) {
                newDir = 90
            }
            if (incomeDir == 270) {
                newDir = 180
            }
            if (incomeDir == 90) {
                newDir = 0
            }
            if (incomeDir == 180) {
                newDir = 270
            }
        }

        return [dir, newDir]

    }

}
