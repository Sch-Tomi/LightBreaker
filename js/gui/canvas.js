class Canvas {
    constructor() {
        this._canvas = document.createElement("canvas")
        this._context = this._canvas.getContext("2d")
        this._canvas.width = 780
        this._canvas.height = 460
        document.querySelector("#lightBreaker").appendChild(this._canvas);

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

        this._hitCounter = new HitCounter(this._context, this._cellDimension, this._boardWidth, this._tablePadding)
        this._parkingTable = new Parking(this._context, this._cellDimension, this._boardWidth, this._tablePadding)

        this._laserPathDrawer = new LaserPath(this._boardWidth, this._boardWidth,5,5,this._tablePadding, this._cellDimension, this._cellDimension)
        this._drawingLaserIsInProgress = false


    }

    _connectMouseEvents(){
      this._canvas.onmousedown = (e) => {
          this.mouseDown(e)
      }
      this._canvas.onmouseup = (e) => {
          this.mouseUp(e)
      }
      this._canvas.ondblclick = (e) => {
          this.mouseClick(e)
      }
    }

    clear() {
        this._blocks = []
        this._parkingTable.clear()
    }

    drawBoard() {
        this._context.beginPath()

        for (var x = 0; x <= this._boardWidth; x += this._cellDimension) {
            this._context.moveTo(0.5 + x + this._tablePadding, this._tablePadding)
            this._context.lineTo(0.5 + x + this._tablePadding, this._boardWidth + this._tablePadding)
        }

        for (var y = 0; y <= this._boardWidth; y += this._cellDimension) {
            this._context.moveTo(this._tablePadding, 0.5 + y + this._tablePadding)
            this._context.lineTo(this._boardWidth + this._tablePadding, 0.5 + y + this._tablePadding);
        }

        this._context.stroke()
    }

    render() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this.drawBoard()
        this._parkingTable.render()
        this._hitCounter.render()

        for (var block of this._blocks) {
            this.drawRotatedImage(block.get_img(), block.get_x(), block.get_y(), block.get_direction());

            if (block.locked()) {
                this.drawLock(block)
            }
        }

        if(this._drawingLaserIsInProgress){

            this._context.beginPath()
            let path = this._laserPathDrawer.next()
            // console.log(path);
            for (var i = 0; i < path.length - 1 ; i++) {
               this._context.moveTo(path[i].col, path[i].row)
               this._context.lineTo(path[i+1].col, path[i+1].row)
            }

            this._drawingLaserIsInProgress = this._laserPathDrawer.isRemainedStep()

            this._context.lineWidth = 5
            this._context.strokeStyle = "red"
            this._context.stroke()
        }

        this._ctxStrokeDefault()
    }

    _ctxStrokeDefault(){
        this._context.lineWidth = 1
        this._context.strokeStyle = "black"
    }

    drawResult(result){
      this._laserPathDrawer.init(result)

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

        block.canvas_repositioning(x, y)
        this._blocks.push(block)
    }

    mouseDown(e) {

        this.searchBlock(this.getMousePos(e))

        if (this._parkingTable.isInTheParking(this._blocks[this._movingBlockID])) {
            var parkingID = this._parkingTable.getParkingID(this._blocks[this._movingBlockID])
            this._parkingTable.setFreeParking(parkingID)
        }

        this._canvas.onmousemove = (e) => {
            this.mouseMove(e)
        }
    }

    mouseUp() {
        this.fitBlockToCell()

        if (this.blockCollision()) {
            this._parkingTable.parkingBlock(this._blocks[this._movingBlockID])
        }

        this._canvas.onmousemove = null
        this._movingBlockID = null
    }

    mouseMove(e) {
        if (this._movingBlockID !== null) {
            var pos = this.getMousePos(e)

            this._blocks[this._movingBlockID].set_x(pos.x)
            this._blocks[this._movingBlockID].set_y(pos.y)
        }
    }

    mouseClick(e) {

        this.searchBlock(this.getMousePos(e))

        if (e.shiftKey) {
            this._blocks[this._movingBlockID].rotate_right()
        } else {
            this._blocks[this._movingBlockID].rotate_left()
        }

        this._movingBlockID = null

    }

    getMousePos(e) {
        var rect = this._canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }


    searchBlock(pos) {
        for (var i = 0; i < this._blocks.length; i++) {
            var block = this._blocks[i]
            if ((block.get_x() - 45 <= pos.x && pos.x <= block.get_x() + 45) && (block.get_y() - 45 <= pos.y && pos.y <= block.get_y() + 45)) {
                this._movingBlockID = i
                break
            }
        }
    }

    fitBlockToCell() {
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

    blockCollision() {
        for (var i = 0; i < this._blocks.length; i++) {
            if (i != this._movingBlockID) {
                if (this._blocks[i].get_x() == this._blocks[this._movingBlockID].get_x() && this._blocks[i].get_y() == this._blocks[this._movingBlockID].get_y()) {
                    return true
                }
            }
        }
        return false
    }

    //http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    drawRotatedImage(image, x, y, angle) {
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

    drawLock(block) {
        this._context.drawImage(this._lock, block.get_x() + 20, block.get_y() - 40)
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

}
