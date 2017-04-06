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
        console.log(element + " ? " +(this.solutions[index].length - 1));
        console.log("VALID:"+this.endCoords[index].row);
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
            console.log(this.endPositions[solutionPointer]);
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
