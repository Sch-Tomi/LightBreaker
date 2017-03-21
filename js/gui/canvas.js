class Canvas {
    constructor() {
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = 780
        this.canvas.height = 460
        document.querySelector("#lightBreaker").appendChild(this.canvas);

        this.blocks = []
        this.moving_block_id = null

        this.canvas.onmousedown = (e) => {
            this.mouseDown(e)
        }
        this.canvas.onmouseup = (e) => {
            this.mouseUp(e)
        }
        this.canvas.ondblclick = (e) => {
            this.mouseClick(e)
        }

        this._board_w = 450
        this.cell_w = 90
        this.cell_wh = this.cell_w / 2
        this.table_p = 5

        this._board_row_num = this._board_w / this.cell_w
        this._board_col_num = this._board_w / this.cell_w


        this._lock = new Image()
        this._lock.src = "img/lock.png"

        this.hit_counter = new HitCounter(this.ctx, this.cell_w, this._board_w, this.table_p)
        this.parking = new Parking(this.ctx, this.cell_w, this._board_w, this.table_p)

    }

    clear() {
        this.blocks = []
        this.parking.clear()
    }

    drawBoard() {
        var bw = this._board_w
        var bh = this._board_w
        var p = this.table_p
        var cw = this.cell_w
        var ch = this.cell_w

        for (var x = 0; x <= bw; x += cw) {
            this.ctx.moveTo(0.5 + x + p, p)
            this.ctx.lineTo(0.5 + x + p, bh + p)
        }


        for (var y = 0; y <= bh; y += ch) {
            this.ctx.moveTo(p, 0.5 + y + p)
            this.ctx.lineTo(bw + p, 0.5 + y + p);
        }

        this.ctx.strokeStyle = "black"
        this.ctx.stroke()
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBoard()
        this.parking.render()
        this.hit_counter.render()

        for (var block of this.blocks) {
            this.drawRotatedImage(block.get_img(), block.get_x(), block.get_y(), block.get_direction());

            if (block.locked()) {
                this.drawLock(block)
            }
        }

    }

    addParkingBlock(block) {
        this.parking.parkingBlock(block)
        this.blocks.push(block)
    }

    isParkingEmpty() {
        return this.parking.isEmpty()
    }

    addBlock(block) {
        var x = block.get_x() * this.cell_w + this.cell_wh + this.table_p
        var y = block.get_y() * this.cell_w + this.cell_wh + this.table_p

        block.canvas_repositioning(x, y)
        this.blocks.push(block)
    }

    mouseDown(e) {

        this.searchBlock(this.getMousePos(e))

        if (this.parking.isInTheParking(this.blocks[this.moving_block_id])) {
            var parkingID = this.parking.getParkingID(this.blocks[this.moving_block_id])
            this.parking.setFreeParking(parkingID)
        }

        this.canvas.onmousemove = (e) => {
            this.mouseMove(e)
        }
    }

    mouseUp() {
        this.fitBlockToCell()

        if (this.blockCollision()) {
            this.parking.parkingBlock(this.blocks[this.moving_block_id])
        }

        this.canvas.onmousemove = null
        this.moving_block_id = null
    }

    mouseMove(e) {
        if (this.moving_block_id !== null) {
            var pos = this.getMousePos(e)

            this.blocks[this.moving_block_id].set_x(pos.x)
            this.blocks[this.moving_block_id].set_y(pos.y)
        }
    }

    mouseClick(e) {

        this.searchBlock(this.getMousePos(e))

        if (e.shiftKey) {
            this.blocks[this.moving_block_id].rotate_right()
        } else {
            this.blocks[this.moving_block_id].rotate_left()
        }

        this.moving_block_id = null

    }

    getMousePos(e) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }


    searchBlock(pos) {
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i]
            if ((block.get_x() - 45 <= pos.x && pos.x <= block.get_x() + 45) && (block.get_y() - 45 <= pos.y && pos.y <= block.get_y() + 45)) {
                this.moving_block_id = i
                break
            }
        }
    }

    fitBlockToCell() {
        var block = this.blocks[this.moving_block_id]
        var row = Math.round(block.get_x() / this.cell_wh)
        var col = Math.round(block.get_y() / this.cell_wh)
        var x = row * this.cell_wh
        var y = col * this.cell_wh

        if (x > this._board_w || y > this._board_w) {
            this.parking.parkingBlock(block)
        } else {
            // between 2 cell
            if ((x - 45) % 90 > 0 || (y - 45) % 90 > 0) {
                this.parking.parkingBlock(block)
            } else {
                //console.log("(" + x + ", " + y + ")");
                block.set_x(x + this.table_p)
                block.set_y(y + this.table_p)
            }

        }
    }

    blockCollision() {
        for (var i = 0; i < this.blocks.length; i++) {
            if (i != this.moving_block_id) {
                if (this.blocks[i].get_x() == this.blocks[this.moving_block_id].get_x() && this.blocks[i].get_y() == this.blocks[this.moving_block_id].get_y()) {
                    return true
                }
            }
        }
        return false
    }

    //http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/
    drawRotatedImage(image, x, y, angle) {
        var TO_RADIANS = Math.PI / 180;
        // save the current co-ordinate system
        // before we screw with it
        this.ctx.save();

        // move to the middle of where we want to draw our image
        this.ctx.translate(x, y);

        // rotate around that point, converting our
        // angle from degrees to radians
        this.ctx.rotate(angle * TO_RADIANS);

        // draw it up and to the left by half the width
        // and height of the image
        this.ctx.drawImage(image, -(Math.round(image.width / 2)), -(Math.round(image.height / 2)));

        // and restore the co-ords to how they were when we began
        this.ctx.restore();
    }

    drawLock(block) {
        this.ctx.drawImage(this._lock, block.get_x() + 20, block.get_y() - 40)
    }

    get_board() {

        //var matrix = Array(this._board_row_num).fill(Array(this._board_col_num).fill(null))

        var matrix = []

        for (var i = 0; i < this._board_row_num; i++) {
            matrix[i] = []
            for (var j = 0; j < this._board_col_num; j++) {
                matrix[i][j] = null
            }
        }


        for (var block of this.blocks) {
            var x = block.get_x()
            var y = block.get_y()

            matrix[Math.floor((y - 45) / 90)][Math.floor((x - 45) / 90)] = block
        }

        return matrix
    }

}
