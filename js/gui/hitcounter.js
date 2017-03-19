class HitCounter {
    constructor(ctx, cell_w, board_w,table_p) {
        this.ctx = ctx
        this.cell_w = cell_w
        this._board_w = board_w
        this.table_p = table_p
    }

    render(){
        this.drawHitCounter()
    }

    drawHitCounter() {
        var bw = this.cell_w
        var bh = this.cell_w
        var p  = this._board_w + 190
        var cw = this.cell_w
        var ch = this.cell_w

        for (var x = 0; x <= bw; x += cw) {
            this.ctx.moveTo(0.5 + x + p, this.table_p + 45)
            this.ctx.lineTo(0.5 + x + p, bh + this.table_p + 45)
        }


        for (var y = 0; y <= bh; y += ch) {
            this.ctx.moveTo(p, 0.5 + y + this.table_p + 45)
            this.ctx.lineTo(bw + p, 0.5 + y + this.table_p + 45);
        }

        this.ctx.strokeStyle = "black"
        this.ctx.stroke()

        this.ctx.font = "15px Comic Sans MS";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Célok száma", 685, 45);

        this.ctx.font = "100px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("1", 685, 130);


    }
}
