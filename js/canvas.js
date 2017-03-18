class Canvas {
  constructor() {
    this.canvas = document.createElement("canvas")
    this.ctx = this.canvas.getContext("2d")
    this.canvas.width = 640
    this.canvas.height = 480
    document.body.appendChild(this.canvas);

    this.blocks = []
    this.moving_block_id = null

    this.canvas.onmousedown = (e) => {this.mouseDown(e)}
    this.canvas.onmouseup = (e) => {this.mouseUp(e)}
    this.canvas.ondblclick = (e) => {this.mouseClick(e)}

    this.cell_w = 90
    this.cell_wh = this.cell_w / 2
    this.table_p = 2

  }

  drawBoard(){
    var bw = 450
    var bh = 450
    var p  = this.table_p
    var cw = this.cell_w
    var ch = this.cell_w

    for (var x = 0; x <= bw; x += cw) {
        this.ctx.moveTo(0.5 + x + p, p)
        this.ctx.lineTo(0.5 + x + p, bh + p)
    }


    for (var x = 0; x <= bh; x += ch) {
        this.ctx.moveTo(p, 0.5 + x + p)
        this.ctx.lineTo(bw + p, 0.5 + x + p);
    }

    this.ctx.strokeStyle = "black"
    this.ctx.stroke()
  }


  render(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBoard()

    for (var block of this.blocks) {
      this.drawRotatedImage(block.get_img(),block.get_x(),block.get_y(),block.get_angle());
    }

  }

  addBlock(block){
    block.set_x(block.get_x()+2)
    block.set_y(block.get_y()+2)
    this.blocks.push(block)
  }

  mouseDown(e){
    this.searchBlock(e.clientX,e.clientY)
    this.canvas.onmousemove = (e) => {this.mouseMove(e)}
  }

  mouseUp(){
    this.fitBlockToCell()
    this.canvas.onmousemove = null
    this.moving_block_id = null
  }

  mouseMove(e){
    if(this.moving_block_id !== null){
      this.blocks[this.moving_block_id].set_x(e.clientX )
      this.blocks[this.moving_block_id].set_y(e.clientY )
    }
  }

  mouseClick(e){

    console.log("HEY");

    this.searchBlock(e.clientX,e.clientY)

    if(e.shiftKey){
      this.blocks[this.moving_block_id].rotate_right()
    }else {
      this.blocks[this.moving_block_id].rotate_left()
    }

    this.moving_block_id = null

  }

  searchBlock(x,y){
    for (var i = 0; i<this.blocks.length;i++) {
      var block = this.blocks[i]
      if( (block.get_x() - 45 <= x &&  x <= block.get_x() + 45) && (block.get_y() - 45 <= y &&  y <= block.get_y() + 45) ){
        this.moving_block_id = i
        break
      }
    }
  }

  fitBlockToCell(){
    var block = this.blocks[this.moving_block_id]
    var row = Math.round(block.get_x() / this.cell_wh)
    var col = Math.round(block.get_y() / this.cell_wh)
    var x = row * this.cell_wh + this.table_p
    var y = col * this.cell_wh + this.table_p

    block.set_x(x)
    block.set_y(y)
  }

  //http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/

  // ELMOSÓDIK?! 
  drawRotatedImage(image, x, y, angle){
    var TO_RADIANS = Math.PI/180;
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
  	this.ctx.drawImage(image, -(image.width/2), -(image.height/2));

  	// and restore the co-ords to how they were when we began
  	this.ctx.restore();
  }

}
