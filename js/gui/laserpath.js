class LaserPath{

  constructor(table_width, table_height, table_row_num, table_col_num, table_padding, cell_w, cell_h ){

    this._t_width = table_width
    this._t_height = table_height
    this._t_row_n = table_row_num
    this._t_col_n = table_col_num
    this._t_padding = table_padding

    this._cell_w = cell_w
    this._cell_h = cell_h

    this.startPos = null
    this.endPos = null

    this.startXY = null
    this.endXY = null
    this.breakPoint = null

    this.solution = null
    this.solutionStepPointer = 0


  }

  init(solution){

    this.solution = solution[0]._path
    this.solutionStepPointer = 0

    this.startPos = solution[0]._path[0]
    this.endPos = solution[0]._path[0]

    if(startPos.direction == 0 ){
      this.startXY = new Position(startPos.row*90+45,startPos.col*90+45,0)
      this.endXY = new Position(endPos.row*90+45-40,endPos.col*90+45,0)
    }else if (startPos.direction == 180) {
      this.startXY = new Position(startPos.row*90+45,startPos.col*90+45,0)
      this.endXY = new Position(endPos.row*90+45+40,endPos.col*90+45,0)
    }else if (startPos.direction == 90) {
      this.startXY = new Position(startPos.row*90+45,startPos.col*90+45,0)
      this.endXY = new Position(endPos.row*90+45,endPos.col*90+45+40,0)
    }else if(startPos.direction == 270) {
      this.startXY = new Position(startPos.row*90+45,startPos.col*90+45,0)
      this.endXY = new Position(endPos.row*90+45,endPos.col*90+4-40,0)
    }

    return [this.startXY,this.endXY]

  }

  next(){

    this._stepOne(this.startXY)
    this._stepOne(this.endXY)

    this._checkChangeDir()

    if( this.breakPoint != null){
      return [this.startXY, this.breakPoint, this.endXY]
    }else{
      return [this.startXY, this.endXY]
    }

  }

  _checkChangeDir(){
    if(this.endXY - 45 % 90 == 0){
      this.solutionStepPointer++
      this.endPos = this.solution[this.solutionStepPointer]
      this.checkForBreakPoint()
    }

    if (startXY.row - 45 % 90 == 0) {
      this.startPos = this.solution[this.solutionStepPointer]
      this.clearBreakPoint()
    }
  }

  checkForBreakPoint(){

    if(this.solution[this.solutionStepPointer - 1].direction != this.solution[this.solutionStepPointer] ){
      this.breakPoint = new Position(this.solution[this.solutionStepPointer].row * 90 + 45,
                                     this.solution[this.solutionStepPointer].col * 90 + 45,
                                     this.solution[this.solutionStepPointer].direction)

    }
  }

  clearBreakPoint(){
    this.breakPoint = null
  }


  _stepOne(pos){
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

}
