class Parking {
    constructor(context, cellDimension, boardDimension, tablePadding) {

        this._context = context
        this._cellDimension = cellDimension
        this._boardDimension = boardDimension
        this._tablePadding = tablePadding

        // true - free | false - reserved
        this._parking = [true, true, true, true, true]
    }

    clear() {
        this._parking = [true, true, true, true, true]
    }

    render() {
      let padding = this._boardDimension + 50

      for (var x = 0; x <= this._cellDimension; x += this._cellDimension) {
          this._context.moveTo(0.5 + x + padding, this._tablePadding)
          this._context.lineTo(0.5 + x + padding, this._boardDimension + this._tablePadding)
      }


      for (var y = 0; y <= this._boardDimension; y += this._cellDimension) {
          this._context.moveTo(padding, 0.5 + y + this._tablePadding)
          this._context.lineTo(this._cellDimension + padding, 0.5 + y + this._tablePadding);
      }

      this._context.strokeStyle = "black"
      this._context.stroke()
    }

    addParkingBlock(block) {
        this.parkingBlock(block)
    }

    parkingBlock(block) {
        var freeID = this._getFreeParking()

        block.set_x(545)
        block.set_y((freeID * 90) + 45 + this._tablePadding)
        this._parking[freeID] = false
    }

    setFreeParking(id) {
        this._parking[id] = true
    }

    isInTheParking(block) {
        return block.get_x() > this._boardDimension
    }

    getParkingID(block) {
        return Math.round((block.get_y() - 45) / 90)
    }

    isEmpty() {
        return this._parking.every((element, index, array) => {
            return element
        })
    }

    _getFreeParking() {
        for (var i = 0; i < this._parking.length; i++) {
            if (this._parking[i]) {
                return i
            }
        }
    }

}


class LaserPathDrawing {

    constructor(table_width, table_height, table_row_num, table_col_num, table_padding, cell_w, cell_h) {

        this._t_width = parseInt(table_width)
        this._t_height = parseInt(table_height)
        this._t_row_n = parseInt(table_row_num)
        this._t_col_n = parseInt(table_col_num)
        this._t_padding = parseInt(table_padding)

        this._cell_w = parseInt(cell_w)
        this._cell_h = parseInt(cell_h)

        this.startPos = null
        this.endPos = null

        this.startXY = null
        this.endXY = null
        this.breakPoint = null

        this.solution = null
        this.solutionStepPointer = 0


    }

    init(solution) {

        this.solution = solution[0]._path
        this.solutionStepPointer = 0


        this.startPos = solution[0]._path[0]
        this.endPos = solution[0]._path[0]

        // console.log("SPOS: ");
        // console.log(this.startPos);
        // console.log("EPOS: ");
        // console.log(this.endPos);

        if (this.startPos.direction == 0) {
            this.startXY = new Position(this._intToCoord(this.startPos.row), this._intToCoord(this.startPos.col) , 0)
            this.endXY = new Position(this._intToCoord(this.endPos.row) - 40, this._intToCoord(this.endPos.col) , 0)
        } else if (this.startPos.direction == 180) {
            this.startXY = new Position(this._intToCoord(this.startPos.row),this._intToCoord(this.startPos.col), 180)
            this.endXY = new Position(this._intToCoord(this.endPos.row) + 40, this._intToCoord(this.endPos.col), 180)
        } else if (this.startPos.direction == 90) {
            this.startXY = new Position(this._intToCoord(this.startPos.row),this._intToCoord(this.startPos.col), 90)
            this.endXY = new Position(this._intToCoord(this.endPos.row), this._intToCoord(this.endPos.col) + 40, 90)
        } else if (this.startPos.direction == 270) {
            this.startXY = new Position(this._intToCoord(this.startPos.row),this._intToCoord(this.startPos.col), 270)
            this.endXY = new Position(this._intToCoord(this.endPos.row), this._intToCoord(this.endPos.col) - 40, 270)
        }

        // console.log("SXY: ")
        // console.log( this.startXY);
        // console.log("EXY: ")
        // console.log( this.endXY);
        //
        // console.log("try:"+ this._coordToInt(this.endXY.row));

        return [this.startXY, this.endXY]

    }

    next() {

        this._stepOne(this.startXY)
        this._stepOne(this.endXY)

        this._checkChangeDir()

        if (this.breakPoint != null) {
            return [this.startXY, this.breakPoint, this.endXY]
        } else {
            return [this.startXY, this.endXY]
        }

    }

    isRemainedStep() {

        if (this.startXY.row < 0 || this.startXY.row > 500 || this.startXY.col < 0 || this.startXY.col > 500){
          this._clearBreakPoint()
          return false
        }

        if(!(this.solutionStepPointer < this.solution.length)){
          this._clearBreakPoint()
        }

        return this.solutionStepPointer < this.solution.length
    }


    _checkChangeDir() {
        // console.log("Dir: " + this.solutionStepPointer);
        if (this._isPosMiddleOfCell(this.endXY.row) && this._isPosMiddleOfCell(this.endXY.col)) {

            if(this.solution.length - 1 > this.solutionStepPointer){
                this.solutionStepPointer++
            }

            this.endPos = this.solution[this.solutionStepPointer]
            this.endXY.direction = this.endPos.direction
            this._checkForBreakPoint()
        }

        if (this._isPosMiddleOfCell(this.startXY.row) && this._isPosMiddleOfCell(this.startXY.col)) {
            this.startPos = this.solution[this.solutionStepPointer]
            this.startXY.direction = this.startPos.direction
            this._clearBreakPoint()
        }
    }

    _checkForBreakPoint() {

        if (this.solution[this.solutionStepPointer - 1].direction != this.solution[this.solutionStepPointer]) {
            this.breakPoint = new Position(this._intToCoord(this.solution[this.solutionStepPointer].row),
                this._intToCoord(this.solution[this.solutionStepPointer].col),
                this.solution[this.solutionStepPointer].direction)

        }
    }

    _clearBreakPoint() {
        this.breakPoint = null
    }


    _stepOne(pos) {
        switch (pos.direction) {
            case 0:
                pos.row -= 5
                break;
            case 90:
                pos.col += 5
                break;
            case 180:
                pos.row += 5
                break;
            case 270:
                pos.col -= 5
                break;
        }
    }

    _intToCoord(integer){
        return integer * this._cell_w + this._cell_w / 2 + this._t_padding
    }

    _coordToInt(coord){
      return (coord - this._t_padding - (this._cell_w / 2)) % this._cell_w
    }

    _isPosMiddleOfCell(pos){
      return this._coordToInt(pos) == 0
    }

}


class Canvas {
    constructor() {
        this._createCanvas()

        this._blocks = []
        this._movingBlockID = null

        this._boardWidth = 450
        this._cellDimension = 90
        this._cellDimensionHalf = this._cellDimension / 2
        this._tablePadding = 5

        this._board_row_num = this._boardWidth / this._cellDimension
        this._board_col_num = this._boardWidth / this._cellDimension


        this._lock = new Image()
        this._lock.src = "img/lock.png"

        this._gameBoard = new GameBoard(this._context, this._cellDimension, this._boardWidth, this._tablePadding)
        this._hitCounter = new HitCounter(this._context, this._cellDimension, this._boardWidth, this._tablePadding)
        this._parkingTable = new Parking(this._context, this._cellDimension, this._boardWidth, this._tablePadding)

        this._laserPathDrawing = new LaserPathDrawing(this._boardWidth, this._boardWidth, 5, 5, this._tablePadding, this._cellDimension, this._cellDimension)
        this._drawingLaserIsInProgress = false

        this._connectMouseEvents()
    }

    clear() {
        this._blocks = []
        this._parkingTable.clear()
    }



    render() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._gameBoard.render()
        this._parkingTable.render()
        this._hitCounter.render()

        this._renderBlocks()

        if (this._drawingLaserIsInProgress) {
            this._drawLaser()
        }

        this._contextStrokeDefault()
    }

    drawResult(result) {
        this._laserPathDrawing.init(result)
        this._drawingLaserIsInProgress = true;
    }

    addParkingBlock(block) {
        this._parkingTable.parkingBlock(block)
        this._blocks.push(block)
    }

    isParkingEmpty() {
        return this._parkingTable.isEmpty()
    }

    addBlock(block) {
        var x = block.get_x() * this._cellDimension + this._cellDimensionHalf + this._tablePadding
        var y = block.get_y() * this._cellDimension + this._cellDimensionHalf + this._tablePadding

        block.canvasRepositioning(x, y)
        this._blocks.push(block)
    }

    get_board() {

        //var matrix = Array(this._board_row_num).fill(Array(this._board_col_num).fill(null))

        var matrix = []

        for (var i = 0; i < this._board_row_num; i++) {
            matrix[i] = []
            for (var j = 0; j < this._board_col_num; j++) {
                matrix[i][j] = null
            }
        }


        for (var block of this._blocks) {
            var x = block.get_x()
            var y = block.get_y()

            matrix[Math.floor((y - 45) / 90)][Math.floor((x - 45) / 90)] = block
        }

        return matrix
    }

    setLimit(newLimit){
        this._hitCounter.setCounter(newLimit)
    }
    ///* PRIVATES

    _createCanvas(){
        this._canvas = document.createElement("canvas")
        this._context = this._canvas.getContext("2d")
        this._canvas.width = 780
        this._canvas.height = 460
        document.querySelector("#lightBreaker").appendChild(this._canvas);
    }

    _connectMouseEvents(){
      this._canvas.onmousedown = (e) => {
          this._mouseDown(e)
      }
      this._canvas.onmouseup = (e) => {
          this._mouseUp(e)
      }
      this._canvas.ondblclick = (e) => {
          this._mouseClick(e)
      }
    }

    _mouseDown(e) {

        this._searchBlock(this._getMousePos(e))

        if (this._parkingTable.isInTheParking(this._blocks[this._movingBlockID])) {
            var parkingID = this._parkingTable.getParkingID(this._blocks[this._movingBlockID])
            this._parkingTable.setFreeParking(parkingID)
        }

        this._canvas.onmousemove = (e) => {
            this._mouseMove(e)
        }
    }

    _mouseUp() {
        this._fitBlockToCell()

        if (this._blockCollision()) {
            this._parkingTable.parkingBlock(this._blocks[this._movingBlockID])
        }

        this._canvas.onmousemove = null
        this._movingBlockID = null
    }

    _mouseMove(e) {
        if (this._movingBlockID !== null) {
            var pos = this._getMousePos(e)

            this._blocks[this._movingBlockID].set_x(pos.x)
            this._blocks[this._movingBlockID].set_y(pos.y)
        }
    }

    _mouseClick(e) {

        this._searchBlock(this._getMousePos(e))

        if (e.shiftKey) {
            this._blocks[this._movingBlockID].rotate_right()
        } else {
            this._blocks[this._movingBlockID].rotate_left()
        }

        this._movingBlockID = null

    }

    _getMousePos(e) {
        var rect = this._canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    _searchBlock(pos) {
        for (var i = 0; i < this._blocks.length; i++) {
            var block = this._blocks[i]
            if ((block.get_x() - 45 <= pos.x && pos.x <= block.get_x() + 45) && (block.get_y() - 45 <= pos.y && pos.y <= block.get_y() + 45)) {
                this._movingBlockID = i
                break
            }
        }
    }

    _blockCollision() {
        for (var i = 0; i < this._blocks.length; i++) {
            if (i != this._movingBlockID) {
                if (this._blocks[i].get_x() == this._blocks[this._movingBlockID].get_x() && this._blocks[i].get_y() == this._blocks[this._movingBlockID].get_y()) {
                    return true
                }
            }
        }
        return false
    }

    _fitBlockToCell() {
        var block = this._blocks[this._movingBlockID]
        var row = Math.round(block.get_x() / this._cellDimensionHalf)
        var col = Math.round(block.get_y() / this._cellDimensionHalf)
        var x = row * this._cellDimensionHalf
        var y = col * this._cellDimensionHalf

        if (x > this._boardWidth || y > this._boardWidth) {
            this._parkingTable.parkingBlock(block)
        } else {
            // between 2 cell
            if ((x - 45) % 90 > 0 || (y - 45) % 90 > 0) {
                this._parkingTable.parkingBlock(block)
            } else {
                //console.log("(" + x + ", " + y + ")");
                block.set_x(x + this._tablePadding)
                block.set_y(y + this._tablePadding)
            }

        }
    }

    _renderBlocks(){
        for (var block of this._blocks) {
            this._drawRotatedImage(block.get_img(), block.get_x(), block.get_y(), block.get_direction());

            if (block.locked()) {
                this._drawLock(block)
            }
        }
    }

    //http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    _drawRotatedImage(image, x, y, angle) {
        var TO_RADIANS = Math.PI / 180;
        // save the current co-ordinate system
        // before we screw with it
        this._context.save();

        // move to the middle of where we want to draw our image
        this._context.translate(x, y);

        // rotate around that point, converting our
        // angle from degrees to radians
        this._context.rotate(angle * TO_RADIANS);

        // draw it up and to the left by half the width
        // and height of the image
        this._context.drawImage(image, -(Math.round(image.width / 2)), -(Math.round(image.height / 2)));

        // and restore the co-ords to how they were when we began
        this._context.restore();
    }

    _drawLock(block) {
        this._context.drawImage(this._lock, block.get_x() + 20, block.get_y() - 40)
    }

    _drawLaser() {
        this._context.beginPath()
        let path = this._laserPathDrawing.next()

        for (var i = 0; i < path.length - 1; i++) {
            this._context.moveTo(path[i].col, path[i].row)
            this._context.lineTo(path[i + 1].col, path[i + 1].row)
        }

        this._drawingLaserIsInProgress = this._laserPathDrawing.isRemainedStep()

        this._context.lineWidth = 5
        this._context.strokeStyle = "red"
        this._context.stroke()
    }

    _contextStrokeDefault() {
        this._context.lineWidth = 1
        this._context.strokeStyle = "black"
    }


}


class HitCounter {
    constructor(context, cellDimension, boardDimension, tablePadding) {
        this._context = context
        this._cellDimension = cellDimension
        this._boardDimension = boardDimension
        this._tablePadding = tablePadding

        this._limit = ""
    }

    render() {

        let padding = this._boardDimension + 190

        for (var x = 0; x <= this._cellDimension; x += this._cellDimension) {
            this._context.moveTo(0.5 + x + padding, this._tablePadding + 45)
            this._context.lineTo(0.5 + x + padding, this._cellDimension + this._tablePadding + 45)
        }


        for (var y = 0; y <= this._cellDimension; y += this._cellDimension) {
            this._context.moveTo(padding, 0.5 + y + this._tablePadding + 45)
            this._context.lineTo(this._cellDimension + padding, 0.5 + y + this._tablePadding + 45);
        }

        this._context.strokeStyle = "black"
        this._context.stroke()

        this._context.font = "15px Comic Sans MS";
        this._context.fillStyle = "black";
        this._context.textAlign = "center";
        this._context.fillText("Célok száma", 685, 45);

        this._context.font = "100px Comic Sans MS";
        this._context.fillStyle = "red";
        this._context.textAlign = "center";
        this._context.fillText(this._limit, 685, 130);
    }

    setCounter(newLimit){
        this._limit = newLimit
    }
}


class GameBoard {
    constructor(context, cellDimension, boardDimension, tablePadding) {
        this._context = context
        this._cellDimension = cellDimension
        this._boardDimension = boardDimension
        this._tablePadding = tablePadding
    }

    render() {
        this._context.beginPath()

        for (var x = 0; x <= this._boardDimension; x += this._cellDimension) {
            this._context.moveTo(0.5 + x + this._tablePadding, this._tablePadding)
            this._context.lineTo(0.5 + x + this._tablePadding, this._boardDimension + this._tablePadding)
        }

        for (var y = 0; y <= this._boardDimension; y += this._cellDimension) {
            this._context.moveTo(this._tablePadding, 0.5 + y + this._tablePadding)
            this._context.lineTo(this._boardDimension + this._tablePadding, 0.5 + y + this._tablePadding);
        }

        this._context.lineWidth = 1
        this._context.strokeStyle = "black"
        this._context.stroke()
    }


}


class LaserPathCalculator {
    constructor(gameboard, minHit) {
        // 5x5
        this._board = gameboard
        this._minHit = minHit
        return this._calc()
    }

    _calc() {

        var laserBlockPos = this._findLaser()

        var paths = [new Path()]
        paths[0].push(laserBlockPos)

        var paths_valid = [true]

        var hitCounter = 0

        //
        while (this._atLeastOneValidPath(paths_valid)) {
            for (var i = 0; i < paths.length; i++) {
                if (paths_valid[i]) {
                    var currentPos = paths[i].get_last()
                    var nextPos = this._calcNewPosition(currentPos)
                    if (this._isPostionValid(nextPos)) {
                        if (this._board[nextPos.row][nextPos.col] !== null) {

                            if ((this._board[nextPos.row][nextPos.col] instanceof Target && this._board[nextPos.row][nextPos.col].isHit(nextPos.direction)) ||
                                (this._board[nextPos.row][nextPos.col] instanceof Mirror && this._board[nextPos.row][nextPos.col].isHit(nextPos.direction))) {
                                hitCounter++
                            }

                            var newDir = this._board[nextPos.row][nextPos.col].get_newDir(nextPos.direction)
                            paths[i].push(new Position(nextPos.row, nextPos.col, newDir[0]))

                            if (newDir.length > 1) {
                                for (var i = 1; i < newDir.length; i++) {
                                    paths.push(new Path())

                                    for (var j = 0; j < paths[i].length - 1; j++) {
                                      paths[paths.length - 1].push(null)
                                    }

                                    paths[paths.length - 1].push(new Position(nextPos.row, nextPos.col, newDir[i]))
                                    paths_valid.push(true)
                                }
                            }

                        } else {
                            paths[i].push(nextPos)
                        }
                    } else {
                        paths_valid[i] = false
                    }
                }
            }
        }

        return {
            paths: paths,
            hits: hitCounter,
            valid: this._isValid(hitCounter)
        }

    }

    _isValid(hitCounter) {

        if (hitCounter >= this._minHit) {
            for (var i = 0; i < this._board.length; i++) {
                for (var j = 0; j < this._board[i].length; j++) {
                    if (this._board[i][j] instanceof Target)
                        if (!this._board[i][j].hitStatus()) return false
                }
            }

            return true
        }

        return false;
    }

    _atLeastOneValidPath(paths) {
        for (var boolean of paths) {
            if (boolean)
                return true
        }

        return false
    }

    _findLaser() {
        for (var i = 0; i < this._board.length; i++) {
            for (var j = 0; j < this._board[i].length; j++) {
                if (this._board[i][j] instanceof Laser)
                    return new Position(i, j, this._board[i][j].get_direction())
            }
        }
    }

    _calcNewPosition(position) {
        var row = position.row
        var col = position.col
        var dir = position.direction
        switch (parseInt(dir)) {
            case 0:
                return new Position(--row, col, dir)
                break;
            case 90:
                return new Position(row, ++col, dir)
                break;
            case 180:
                return new Position(++row, col, dir)
                break
            case 270:
                return new Position(row, --col, dir)
                break
        }

    }

    _isPostionValid(position) {
        return position.row >= 0 && position.col >= 0 && position.row < this._board.length && position.col < this._board.length
    }

}


class Position {
    constructor(row, col, direction) {
        this.row = row
        this.col = col
        this.direction = direction
    }
}


class Path {
    constructor() {
        this._path = []
    }

    push(element) {
        this._path.push(element)
    }

    get_last() {
        return this._path[this._path.length - 1]
    }

    get_path() {
        return this._path
    }
}


class Game {
    constructor() {
        this.canvas = new Canvas()
        this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
        this._setInteface()
        this._precentRightClick()

        this._minHit = 0

    }

    run() {
        // Let's play this game!
        this._main();
    }

    _setInteface(){
        this.selector = document.createElement("select")
        this.selector.id = "lvlSelect"
        this.selector.innerHTML += "<option disabled selected value> -- select a level -- </option>"
        this.selector.innerHTML += "<option value='1'>Level 1</option>"
        this.selector.innerHTML += "<option value='2'>Level 2</option>"
        this.selector.innerHTML += "<option value='3'>Level 3</option>"

        document.body.querySelector("#lightBreaker-lvlSelector").appendChild(this.selector)
        this.selector.onchange = () => {
            this._levelSelect()
        }

        this.fireButton = document.createElement('button')
        this.fireButton.textContent = 'Fire!'
        this.fireButton.className = 'fireBtn'
        this.fireButton.id = "fireButton"

        document.body.querySelector("#lightBreaker-fireButton").appendChild(this.fireButton)
        this.fireButton.onclick = () => {
            this._fire()
        }
    }

    _precentRightClick(){
        document.body.oncontextmenu = () => {
            return false
        }
    }

    _levelSelect() {
        this.canvas.clear()
        switch (parseInt(this.selector.options[this.selector.selectedIndex].value)) {
            case 1:
                this._level1()
                break;
            case 2:
                this._level2()
                break;
            case 3:
                this._level3()
                break;
            default:

        }
    }

    _level1() {
        this.canvas.addBlock(new Laser(180, 1, 1, false, false))
        this.canvas.addBlock(new Target(0, 3, 3, false, true))
        this.canvas.addParkingBlock(new DoubleMirror(0, 0, 0, true, true))

        this._minHit = 1
        this.canvas.setLimit(this._minHit)
    }

    _level2() {
        this.canvas.addBlock(new Laser(270, 0, 0, false, true))
        this.canvas.addBlock(new Target(90, 4, 0, false, true))
        this.canvas.addBlock(new DoubleMirror(90, 3, 1, false, false))

        this.canvas.addParkingBlock(new Target(0, 0, 0, true, true))
        this.canvas.addParkingBlock(new HalfMirror(0, 0, 0, true, true))

        this._minHit = 2
        this.canvas.setLimit(this._minHit)
    }

    _level3() {
        this.canvas.addBlock(new Laser(90, 1, 2, false, true))
        this.canvas.addBlock(new Mirror(270, 2, 0, false, true))
        this.canvas.addBlock(new Mirror(270, 4, 0, false, true))
        this.canvas.addBlock(new Mirror(0, 3, 2, false, false))
        this.canvas.addBlock(new DoubleMirror(90, 0, 4, false, false))
        this.canvas.addBlock(new CheckPoint(0, 4, 3, false, false))

        this.canvas.addParkingBlock(new Mirror(0, 0, 0, true, true))
        this.canvas.addParkingBlock(new Mirror(0, 0, 0, true, true))
        this.canvas.addParkingBlock(new HalfMirror(0, 0, 0, true, true))

        this._minHit = 2
        this.canvas.setLimit(this._minHit)
    }

    _fire(){
        if(this.canvas.isParkingEmpty()){
            var result = new LaserPathCalculator(this.canvas.get_board(), this._minHit)
            if(result.valid){
              this.canvas.drawResult(result.paths)
            }
        }
    }

    _main() {
        this.canvas.render();

        // Request to do this again ASAP
        requestAnimationFrame(() => {
            this._main()
        });
    }

}


class MasterBlock {
    constructor(img, angle, x, y, moving, rotating) {

        this._x = x
        this._y = y

        this._direction = angle

        this._img = new Image()
        this._img.src = img

        this._moving = moving
        this._rotating = rotating

    }

    canvasRepositioning(x, y) {
        this._x = x
        this._y = y
    }

    get_x() {
        return this._x
    }

    set_x(x) {
        if (this._moving) {
            this._x = x
        }
    }

    get_y(){
        return this._y
    }

    set_y(y) {
        if (this._moving) {
            this._y = y
        }
    }

    get_img() {
        return this._img
    }

    get_direction() {
        return this._direction
    }

    rotate_left() {
        if (this._rotating) {
            this._direction -= 90

            if (this._direction < 0)
                this._direction = 360 - (-1 * this._direction)
        }
    }

    rotate_right() {
        if (this._rotating) {
            this._direction = (this._direction + 90) % 360
        }
    }

    locked() {
        return !this._rotating
    }

}


class CheckPoint extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("img/ellenorzo.png", heading, x, y, moving, rotating)

        this._hit = false
    }

    get_newDir(dir) {
        return dir
    }

    hitStatus() {
        return this._hit
    }

}


class Blocker extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("img/blokkolo.png", heading, x, y, moving, rotating)
    }

    get_newDir(dir) {
        return dir
    }
}


class Laser extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("img/lezer.png", heading, x, y, moving, rotating)
    }
}


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
          retur [270]
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


class Target extends Mirror {
    constructor(heading, x, y, moving, rotating) {
        super(heading, x, y, moving, rotating, "img/cel.png")

        this._hit = false

    }

    hitStatus() {
        return this._hit
    }

}


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


class HalfMirror extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("img/felig.png", heading, x, y, moving, rotating)
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


