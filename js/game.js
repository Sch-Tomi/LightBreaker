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
    this.level1()
    this.main();
  }

  level1(){
    this.canvas.addBlock(new Laser(180,1,1,false,false))
    this.canvas.addBlock(new Target(0,3,3,false,true))
    this.canvas.addParkingBlock(new DoubleMirror(0,0,0,true,true))
  }
}
