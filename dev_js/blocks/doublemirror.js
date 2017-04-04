class DoubleMirror extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("img/dupla.png", heading, x, y, moving, rotating)
    }

    get_newDir(laserDirection) {
        //console.log(dir);
        var myDirection = this._direction % 180
        laserDirection = (laserDirection + 180) % 360
        //console.log(myDir + " - " + dir);

        if (myDirection == 0) {
          return this._getNewDirectionWithNormalMirrorPosition(laserDirection)
        } else {
          return this._getNewDirectionWithOpositeMirrorPosition(laserDirection)
        }

    }


    _getNewDirectionWithNormalMirrorPosition(direction){
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

    _getNewDirectionWithOpositeMirrorPosition(direction){
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
}
