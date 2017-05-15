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

    constructor(table_dimension, table_row_num, table_col_num, table_padding, cell_dimension) {

        this._tableDimension = parseInt(table_dimension)
        this._tableRowNum = parseInt(table_row_num)
        this._tableColNum = parseInt(table_col_num)
        this._tablePadding = parseInt(table_padding)

        this._cellDimension = parseInt(cell_dimension)

        this.startPositions = null
        this.endPositions = null

        this.startCoords = null
        this.endCoords = null
        this.breakPoints = null

        this.solutions = null
        this.solutionsStepPointer = 0


    }

    init(solution) {

        this.startPositions = []
        this.endPositions = []

        this.startCoords = []
        this.endCoords = []
        this.breakPoints = []

        this.solutions = solution
        this.solutionsStepPointer = []

        for (let solution of this.solutions) {

            this.solutionsStepPointer.push(0)

            this.startPositions.push(solution.get_path()[0])
            this.endPositions.push(solution.get_path()[0])

            this.breakPoints.push(null)

            switch (this.startPositions[this.startPositions.length - 1].direction) {
                case 0:
                    this.startCoords.push(new Position(this._intToCoord(this.startPositions[this.startPositions.length - 1].row), this._intToCoord(this.startPositions[this.startPositions.length - 1].col), 0))
                    this.endCoords.push(new Position(this._intToCoord(this.endPositions[this.endPositions.length - 1].row) - 40, this._intToCoord(this.endPositions[this.endPositions.length - 1].col), 0))
                    break;
                case 90:
                    this.startCoords.push(new Position(this._intToCoord(this.startPositions[this.startPositions.length - 1].row), this._intToCoord(this.startPositions[this.startPositions.length - 1].col), 90))
                    this.endCoords.push(new Position(this._intToCoord(this.endPositions[this.endPositions.length - 1].row), this._intToCoord(this.endPositions[this.endPositions.length - 1].col) + 40, 90))
                    break;
                case 180:
                    this.startCoords.push(new Position(this._intToCoord(this.startPositions[this.startPositions.length - 1].row), this._intToCoord(this.startPositions[this.startPositions.length - 1].col), 180))
                    this.endCoords.push(new Position(this._intToCoord(this.endPositions[this.endPositions.length - 1].row) + 40, this._intToCoord(this.endPositions[this.endPositions.length - 1].col), 180))
                    break;
                case 270:
                    this.startCoords.push(new Position(this._intToCoord(this.startPositions[this.startPositions.length - 1].row), this._intToCoord(this.startPositions[this.startPositions.length - 1].col), 270))
                    this.endCoords.push(new Position(this._intToCoord(this.endPositions[this.endPositions.length - 1].row), this._intToCoord(this.endPositions[this.endPositions.length - 1].col) - 40, 270))
                    break;

            }
        }
    }
    // TODO:  MIVAN HA NULL a startpos[i]
    next() {

        let laserPaths = []

        for (var i = 0; i < this.startCoords.length; i++) {
            this._stepOne(this.startCoords[i])
            this._stepOne(this.endCoords[i])

            this._checkChangeDir(i)

            if (this.breakPoints[i] != null) {
                if (this._isCoordValid(this.endCoords[i])) {
                    laserPaths.push([this.startCoords[i], this.breakPoints[i], this.endCoords[i]])
                }
            } else {
                if (this._isCoordValid(this.endCoords[i])) {
                    laserPaths.push([this.startCoords[i], this.endCoords[i]])
                }
            }
        }
        return laserPaths
    }

    isRemainedStep() {
        return this.solutionsStepPointer.some((element, index, array)=>{return this._checkValidsolutionStepPointer(element, index, array)})
    }

    _checkValidsolutionStepPointer(element, index, array){
        // console.log(element + " ? " +(this.solutions[index].length - 1));
        // console.log("VALID:"+this.endCoords[index].row);
        if(element == this.solutions[index].length-1){

            return this._isCoordValid(this.endCoords[index])
        }else {
            return element < this.solutions[index].length
        }
    }

    _checkChangeDir(solutionPointer) {
        // console.log("Dir: " + this.solutionStepPointer);
        if (this._isPosMiddleOfCell(this.endCoords[solutionPointer].row) && this._isPosMiddleOfCell(this.endCoords[solutionPointer].col)) {

            if (this.solutions[solutionPointer].get_path().length - 1 > this.solutionsStepPointer[solutionPointer]) {
                this.solutionsStepPointer[solutionPointer]++
            }

            this.endPositions[solutionPointer] = this.solutions[solutionPointer].get_path()[this.solutionsStepPointer[solutionPointer]]
            // console.log(this.endPositions[solutionPointer]);
            this.endCoords[solutionPointer].direction = this.endPositions[solutionPointer].direction
            this._checkForBreakPoint(solutionPointer)
        }

        if (this._isPosMiddleOfCell(this.startCoords[solutionPointer].row) && this._isPosMiddleOfCell(this.startCoords[solutionPointer].col)) {
            this.startPositions[solutionPointer] = this.solutions[solutionPointer].get_path()[this.solutionsStepPointer[solutionPointer]]
            this.startCoords[solutionPointer].direction = this.startPositions[solutionPointer].direction
            this._clearBreakPoint(solutionPointer)
        }
    }

    _checkForBreakPoint(solutionPointer) {

        if (this.solutions[solutionPointer].get_path()[this.solutionsStepPointer[solutionPointer] - 1].direction != this.solutions[solutionPointer].get_path()[this.solutionsStepPointer[solutionPointer]]) {
            this.breakPoints[solutionPointer] = new Position(this._intToCoord(this.solutions[solutionPointer].get_path()[this.solutionsStepPointer[solutionPointer]].row),
                this._intToCoord(this.solutions[solutionPointer].get_path()[this.solutionsStepPointer[solutionPointer]].col),
                this.solutions[solutionPointer].get_path()[this.solutionsStepPointer[solutionPointer]].direction)

        }
    }

    _clearBreakPoint(solutionPointer) {
        this.breakPoints[solutionPointer] = null
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

    _intToCoord(integer) {
        return integer * this._cellDimension + (this._cellDimension / 2) + this._tablePadding
    }

    _coordToInt(coord) {
        return (coord - this._tablePadding - (this._cellDimension / 2)) % this._cellDimension
    }

    _isPosMiddleOfCell(pos) {
        return this._coordToInt(pos) == 0
    }

    _isCoordValid(coord){
        return coord.row > 0 && coord.row < this._tableDimension+this._tablePadding &&
               coord.col > 0 && coord.col < this._tableDimension+this._tablePadding
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
        this._lock.src = "/img/blocks/lock.png"

        this._gameBoard = new GameBoard(this._context, this._cellDimension, this._boardWidth, this._tablePadding)
        this._hitCounter = new HitCounter(this._context, this._cellDimension, this._boardWidth, this._tablePadding)
        this._parkingTable = new Parking(this._context, this._cellDimension, this._boardWidth, this._tablePadding)

        this._laserPathDrawing = new LaserPathDrawing(this._boardWidth, 5, 5, this._tablePadding, this._cellDimension)
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

        let paths = this._laserPathDrawing.next()
        //console.log("PATHS:"+paths);
        for (let path of paths) {
            this._context.beginPath()
            for (var i = 0; i < path.length - 1; i++) {
                this._context.moveTo(path[i].col, path[i].row)
                this._context.lineTo(path[i + 1].col, path[i + 1].row)
            }

            this._drawingLaserIsInProgress = this._laserPathDrawing.isRemainedStep()

            this._context.lineWidth = 5
            this._context.strokeStyle = "red"
            this._context.stroke()
        }
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


class Modal {
    constructor() {
        this._text = ""
        this._header = ""

        this._createModal()
        //this.show()
    }

    setUp(newHeader, newText){

        this._text = ""

        for (let text of newText) {
            this._text += "<p>"+text+"</p>"
        }

        this._header = newHeader
    }

    _createModal(){

        let modal = document.createElement('div')
        modal.id = "messageModal"
        modal.className = "modal"

        let content = document.createElement('div')
        content.id = "messageModal-content"
        content.className = "modal-content"

        let header = document.createElement('div')
        header.className = "modal-header"
        header.innerHTML += '<span id="messageModal-close" class="close">&times;</span>'
        header.innerHTML += '<h2 id="messageModal-header"></h2>'

        let body = document.createElement('div')
        body.className = "modal-body"
        body.id = "messageModal-body"

        content.appendChild(header)
        content.appendChild(body)
        modal.appendChild(content)

        document.body.appendChild(modal)

        document.querySelector('#messageModal-close').onclick = (e) => {this.hide()}


    }

    hide(){

        document.querySelector('#messageModal').style.webkitAnimationName = 'fadeOut'
        document.querySelector('#messageModal-content').style.webkitAnimationName = 'slideOut'

        document.querySelector('#messageModal').addEventListener('animationend', (e) => {
            document.querySelector('#messageModal').style.display = "none";
        })


    }

    show(){

        document.querySelector('#messageModal').style.animationName = 'fadeIn'
        document.querySelector('#messageModal-content').style.animationName = 'slideIn'

        document.querySelector('#messageModal-header').innerHTML = this._header
        document.querySelector('#messageModal-body').innerHTML = "<p>"+this._text+"</p>"
        document.querySelector('#messageModal').style.display = "block";

        document.querySelector('#messageModal').addEventListener('animationend', (e) => {
            document.querySelector('#messageModal').style.display = "block";
        })

        setTimeout(() => {this.hide()}, 3000);
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

    get length(){
        return this._path.length
    }

    get_last() {
        return this._path[this._path.length - 1]
    }

    get_path() {
        return this._path
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
                                for (var newDirI = 1; newDirI < newDir.length; newDirI++) {
                                    paths.push(new Path())

                                    for (var j = 0; j < paths[i].length - 1; j++) {

                                        paths[paths.length - 1].push(paths[i].get_path()[j])
                                    }

                                    paths[paths.length - 1].push(new Position(nextPos.row, nextPos.col, newDir[newDirI]))
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
                    if (this._board[i][j] instanceof Target || this._board[i][j] instanceof CheckPoint)
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


class Game {
    constructor() {
        this.canvas = new Canvas()
        this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

        this._setInteface()
        this._preventRightClick()

        this._minHit = 0

        this._lvl_data = ""

    }

    setLvl(data) {
        this._lvl_data = data;
    }

    run() {
        // Let's play this game!
        this._parseLvl();
        this._main();
    }

    _setInteface() {

        this._modal = new Modal()

        this.fireButton = document.createElement('button')
        this.fireButton.textContent = 'Tűz!'
        this.fireButton.className = 'fireBtn'
        this.fireButton.id = "fireButton"

        document.body.querySelector("#lightBreaker-fireButton").appendChild(this.fireButton)
        this.fireButton.onclick = () => {
            this._fire()
        }
    }

    _preventRightClick() {
        document.body.oncontextmenu = () => {
            return false
        }
    }

    _parseLvl() {
        let lvl = this._lvl_data[0]
        this._parseField(lvl.field)
        this._parseParking(lvl.parking)

        this._minHit = lvl.hits
        this.canvas.setLimit(this._minHit)
    }

    _parseField(field) {

        for (let block of field) {
            this.canvas.addBlock(this._createNewBlock(block))
        }

    }

    _parseParking(parking) {

        for (var block of parking) {
            this.canvas.addParkingBlock(this._createNewBlock(block))
        }

    }

    _createNewBlock(block) {
        switch (block.type) {
            case "HalfMirror":
                return new HalfMirror(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Mirror":
                return new Mirror(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "DoubleMirror":
                return new DoubleMirror(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Target":
                return new Target(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "CheckPoint":
                return new CheckPoint(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Blcoker":
                return new Blocker(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
            case "Laser":
                return new Laser(block.heading, block.col, block.row, block.moving, block.rotating)
                break;
        }

    }

    _fire() {
        if (this.canvas.isParkingEmpty()) {
            var result = new LaserPathCalculator(this.canvas.get_board(), this._minHit)
            if (result.valid) {
                this._modal.setUp("Gratulálok", ["Sikeresen teljesítetted a pályát!"])
                this._ajax({
                    mod: 'post',
                    url: '/game/report',
                    postadat: 'status=success&id='+window.location.pathname.split("/")[2],
                    siker: (xhr, txt) => {this._modal.setUp("Gratulálok", ["Ők is megoldották már: \n\n", txt]); this._modal.show()}
                })
            } else {
                let missNumber = parseInt(this._minHit) - parseInt(result.hits)
                if (missNumber == 0) {
                    this._modal.setUp("Nem sikerült!", ["Nem sikerült minden kötelező célt eltalálnod!"])
                } else {
                    this._modal.setUp("Nem sikerült!", ["Nem sikerült megfelelő számu célt eltalálnod!",
                        "Hiányzó találatok: " + missNumber
                    ])
                }
            }
            this.canvas.drawResult(result.paths)
        } else {
            this._modal.setUp("Hiba!", ["Minden tükröt kötelezően fel kell használnod!"])
        }

        this._modal.show()
    }

    _ajax(opts) {
        var mod = opts.mod || 'GET',
            url = opts.url || '',
            getadat = opts.getadat || '',
            postadat = opts.postadat || '',
            siker = opts.siker || function() {},
            hiba = opts.hiba || function() {};

        mod = mod.toUpperCase();

        if(this._endsWithPhp(url)){
            url = url + '?' + getadat;
        }

        var xhr = new XMLHttpRequest(); // ujXHR();
        xhr.open(mod, url, true);
        if (mod === 'POST') {
            xhr.setRequestHeader('Content-Type',
                'application/x-www-form-urlencoded');
        }
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    siker(xhr, xhr.responseText);
                } else {
                    hiba(xhr);
                }
            }
        }, false);
        xhr.send(mod == 'POST' ? postadat : null);
        return xhr;
    }

    _endsWithPhp(url){

        return url[url.length-1] == "p" &&
                url[url.length-2] == "h" &&
                url[url.length-3] == "p"

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


class Blocker extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("/img/blocks/blokkolo.png", heading, x, y, moving, rotating)
    }

    get_newDir(dir) {
        return [dir]
    }
}


class Laser extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("/img/blocks/lezer.png", heading, x, y, moving, rotating)
    }
}


class Mirror extends MasterBlock {
    constructor(heading, x, y, moving, rotating, imgsrc = null) {
        if (imgsrc === null) {
            super("/img/blocks/tukor.png", heading, x, y, moving, rotating)
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


class Target extends Mirror {
    constructor(heading, x, y, moving, rotating) {
        super(heading, x, y, moving, rotating, "/img/blocks/cel.png")

        this._hit = false

    }

    hitStatus() {
        return this._hit
    }

}


class DoubleMirror extends MasterBlock {
    constructor(heading, x, y, moving, rotating) {
        super("/img/blocks/dupla.png", heading, x, y, moving, rotating)
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


