class Game {
  constructor() {
    this.canvas = new Canvas()

    this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;
    this.then = 0

    document.body.oncontextmenu = () => {return false}
  }

  main(){
    var now = Date.now();
  	var delta = now - this.then;

  	// update(delta / 1000);
  	this.canvas.render();

  	this.then = now;

  	// Request to do this again ASAP

    requestAnimationFrame(()=>this.main());
  }

  run(){
    // Let's play this game!
    this.then = Date.now();
    this.canvas.addBlock(new Laser(0,45,45,false,false))
    this.main();
  }
}
