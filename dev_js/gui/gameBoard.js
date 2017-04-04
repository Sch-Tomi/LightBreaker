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
