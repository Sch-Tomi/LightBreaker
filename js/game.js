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
    this.level3()
    this.main();
  }

  level1(){
    this.canvas.addBlock(new Laser(180,1,1,false,false))
    this.canvas.addBlock(new Target(0,3,3,false,true))
    this.canvas.addParkingBlock(new DoubleMirror(0,0,0,true,true))
  }

  level2(){
    this.canvas.addBlock(new Laser(270,0,0,false,true))
    this.canvas.addBlock(new Target(90,4,0,false,true))
    this.canvas.addBlock(new DoubleMirror(90,3,1,false,false))

    this.canvas.addParkingBlock(new Target(0,0,0,true,true))
    this.canvas.addParkingBlock(new HalfMirror(0,0,0,true,true))
  }

  level3(){
    this.canvas.addBlock(new Laser(90,1,2,false,true))
    this.canvas.addBlock(new Mirror(270,2,0,false,true))
    this.canvas.addBlock(new Mirror(270,4,0,false,true))
    this.canvas.addBlock(new Mirror(0,3,2,false,false))
    this.canvas.addBlock(new DoubleMirror(90,0,4,false,false))
    this.canvas.addBlock(new CheckPoint(0,4,3,false,false))

    this.canvas.addParkingBlock(new Mirror(0,0,0,true,true))
    this.canvas.addParkingBlock(new Mirror(0,0,0,true,true))
    this.canvas.addParkingBlock(new HalfMirror(0,0,0,true,true))
  }

}
