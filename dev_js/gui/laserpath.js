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
