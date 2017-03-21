class Parking {
    constructor(ctx, cell_w, board_w, table_p) {

        this.ctx = ctx
        this.cell_w = cell_w
        this._board_w = board_w
        this.table_p = table_p

        // true - free | false - reserved
        this._parking = [true, true, true, true, true]
    }

    clear() {
        this._parking = [true, true, true, true, true]
    }

    render() {
        this.drawParking()
    }

    drawParking() {
        var bw = this.cell_w
        var bh = this._board_w
        var p = this._board_w + 50
        var cw = this.cell_w
        var ch = this.cell_w

        for (var x = 0; x <= bw; x += cw) {
            this.ctx.moveTo(0.5 + x + p, this.table_p)
            this.ctx.lineTo(0.5 + x + p, bh + this.table_p)
        }


        for (var y = 0; y <= bh; y += ch) {
            this.ctx.moveTo(p, 0.5 + y + this.table_p)
            this.ctx.lineTo(bw + p, 0.5 + y + this.table_p);
        }

        this.ctx.strokeStyle = "black"
        this.ctx.stroke()
    }

    addParkingBlock(block) {
        this.parkingBlock(block)
    }

    parkingBlock(block) {
        var free = this.getFreeParking()

        block.set_x(545)
        block.set_y((free * 90) + 45 + this.table_p)
        this._parking[free] = false
    }

    getFreeParking() {
        for (var i = 0; i < this._parking.length; i++) {
            if (this._parking[i]) {
                return i
            }
        }
    }

    setFreeParking(id) {
        this._parking[id] = true
    }

    isInTheParking(block) {
        return block.get_x() > this._board_w
    }

    getParkingID(block) {
        return Math.round((block.get_y() - 45) / 90)
    }

    isEmpty() {
        return this._parking.every((e, i, a) => {
            return e
        })
    }
}
