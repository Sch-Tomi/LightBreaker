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
