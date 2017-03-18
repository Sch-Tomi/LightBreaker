class Game {
  constructor() {
    this.canvas = new Canvas()
    this.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame;

    document.body.oncontextmenu = () => {return false}
  }

  main(){
  	this.canvas.render();

  	// Request to do this again ASAP
    requestAnimationFrame(()=>{this.main()});
  }

  run(){
    // Let's play this game!
    this.canvas.addBlock(new Laser(0,4,4,false,false))
    this.canvas.addParkingBlock(new Laser(0,0,0,true,true))
    this.main();
  }
}
