class DoubleMirror extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("img/dupla.png", heading, x, y, moving, rotating)
    }

    get_newDir(dir) {
        //console.log(dir);
        var myDir = this._direction % 180
        dir = (dir + 180) % 360
        //console.log(myDir + " - " + dir);

        if (myDir == 0) {
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
        } else {
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
        }

    }
}
