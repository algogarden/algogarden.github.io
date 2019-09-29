
// import Board from './Board.js'

 class BoardManager{
    constructor() {
        // this.instance=instance
        this.pool = 0;
        this.listBoard=[];
    }

    addBoard(sleepTime,skate_holder,algorithm){
        // debugger;
        this.pool++;
        this.listBoard.push(new Board(sleepTime,skate_holder,algorithm));
    }
    // run(){
    //     for(var i=0;i<this.pool;i++){
    //         this.listBoard[i].DrawCanvas(this.instance);
    //     }
    // }
}

