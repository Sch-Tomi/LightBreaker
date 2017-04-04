class LaserPathDrawing {

    constructor(table_width, table_height, table_row_num, table_col_num, table_padding, cell_w, cell_h) {

        this._t_width = parseInt(table_width)
        this._t_height = parseInt(table_height)
        this._t_row_n = parseInt(table_row_num)
        this._t_col_n = parseInt(table_col_num)
        this._t_padding = parseInt(table_padding)

        this._cell_w = parseInt(cell_w)
        this._cell_h = parseInt(cell_h)

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
                laserPaths.push([this.startCoords[i], this.breakPoints[i], this.endCoords[i]])
            } else {
                laserPaths.push([this.startCoords[i], this.endCoords[i]])
            }
        }
        return laserPaths
    }

    isRemainedStep() {

        if (this.startCoords.some((element, index, array) => {
                return element.row < 0 || element.row > 500 || element.col < 0 || element.col > 500
            })) {
            return true
        }

        // if (!(this.solutionsStepPointer < this.solution.length)) {
        //     this._clearBreakPoint()
        // }

        return this.solutionsStepPointer.some((element, index, array)=>{return this._checkValidsolutionStepPointer(element, index, array)})
    }

    _checkValidsolutionStepPointer(element, index, array){
        return element.length < this.solutions[index].length
    }

    _checkChangeDir(solutionPointer) {
        // console.log("Dir: " + this.solutionStepPointer);
        if (this._isPosMiddleOfCell(this.endCoords[solutionPointer].row) && this._isPosMiddleOfCell(this.endCoords[solutionPointer].col)) {

            if (this.solutions[solutionPointer].get_path().length - 1 > this.solutionStepPointer[solutionPointer]) {
                this.solutionStepPointer[solutionPointer]++
            }

            this.endPositions[solutionPointer] = this.solutions[solutionPointer][this.solutionStepPointer]
            this.endCoords[solutionPointer].direction = this.endPositions[solutionPointer].direction
            this._checkForBreakPoint(solutionPointer)
        }

        if (this._isPosMiddleOfCell(this.startCoords[solutionPointer].row) && this._isPosMiddleOfCell(this.startCoords[solutionPointer].col)) {
            this.startPositions[solutionPointer] = this.solutions[solutionPointer][this.solutionStepPointer]
            this.startCoords[solutionPointer].direction = this.startPositions[solutionPointer].direction
            this._clearBreakPoint(solutionPointer)
        }
    }

    _checkForBreakPoint(solutionPointer) {

        if (this.solutions[solutionPointer].get_path()[this.solutionsStepPointer - 1].direction != this.solutions[solutionPointer].get_path()[this.solutionStepPointer]) {
            this.breakPoints[solutionPointer] = new Position(this._intToCoord(this.solutions[solutionPointer].get_path()[this.solutionStepPointer].row),
                this._intToCoord(this.solutions[solutionPointer].get_path()[this.solutionStepPointer].col),
                this.solutions[solutionPointer].get_path()[this.solutionStepPointer].direction)

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
        return integer * this._cell_w + this._cell_w / 2 + this._t_padding
    }

    _coordToInt(coord) {
        return (coord - this._t_padding - (this._cell_w / 2)) % this._cell_w
    }

    _isPosMiddleOfCell(pos) {
        return this._coordToInt(pos) == 0
    }

}
