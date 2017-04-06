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

    get_newDir(laserDirection) {

        var myDir = this._direction % 180
        laserDirection = (laserDirection + 180) % 360

        if (myDir == 0) {
            return this._getNewDirectionWithNormalMirrorPosition(laserDirection)
        } else {
            return this._getNewDirectionWithOpositeMirrorPosition(laserDirection)
        }

    }


    _getNewDirectionWithNormalMirrorPosition(direction){
      switch (direction) {
        case 0:
          return [90]
          break;
        case 90:
          return [0]
          break
        case 180:
          return [270]
          break;
        case 270:
          return [180]
          break;
      }
    }

    _getNewDirectionWithOpositeMirrorPosition(direction){
      switch (direction) {
        case 0:
          return [270]
          break;
        case 90:
          return [180]
          break
        case 180:
          return [90]
          break;
        case 270:
          return [0]
          break;
      }
    }
}
