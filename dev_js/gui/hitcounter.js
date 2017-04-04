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
