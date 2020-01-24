// import Board from './Board.js'

class BoardManager {
  constructor(world,algo, point) {
    this.world=world;
    this.algo = algo;
    this.point = point;
    this.listBoard=[];
  }
  addBoard(sleepTime, skate_holder, algorithm) {
    // debugger;
    this.listBoard.push(new Board(this.world,this.point,sleepTime, skate_holder, algorithm));
  }
  setWorld(world){
    this.world=world;
    for(var i=0;i<this.listBoard.length;i++){
      this.listBoard[i].setWorld(this.world);
    }
  }
  run() {
    for (var i = 0; i < this.algo; i++) {
      this.listBoard[i].plotPoints();
    }
  }
}
