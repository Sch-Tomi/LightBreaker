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
