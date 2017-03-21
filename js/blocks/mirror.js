class Mirror extends MasterBlock {
    constructor(heading, x, y, moving, rotating, imgsrc = null) {
        if (imgsrc === null) {
            super("img/tukor.png", heading, x, y, moving, rotating)
        } else {
            super(imgsrc, heading, x, y, moving, rotating)
        }

    }

    isHit(dir) {
        //console.log(dir);
        var myDir = this._direction
        dir = (dir + 180) % 360
        //console.log(myDir + " - " + dir);

        if (myDir == dir) this._hit = true

        return myDir == dir;
    }

    get_newDir(dir) {

        var myDir = this._direction % 180
        dir = (dir + 180) % 360
        console.log(myDir + " - " + dir);

        if (myDir == 0) {
            if (dir == 0) {
                return [90]
            }
            if (dir == 270) {
                return [180]
            }
            if (dir == 90) {
                return [0]
            }
            if (dir == 180) {
                return [270]
            }
        } else {
            if (dir == 0) {
                return [270]
            }
            if (dir == 270) {
                return [0]
            }
            if (dir == 90) {
                return [180]
            }
            if (dir == 180) {
                return [90]
            }
        }

    }
}
