// import BoardManager from "./BoardManager.js";
// import World from "./World.js"
var Singleton = (function() {
  var instance = null;
  
  function createInstance(pool, numberOfBall,radius) {
      var object = new World(pool, numberOfBall,radius);
      return object;
  }
  return { // public interface
    getInstance: function (pool, numberOfBall,radius) {
      if (!instance) {
          instance = createInstance(pool, numberOfBall,radius);
      }
      return instance;
    },
    getInstance: function () {
      if (!instance) {
          instance = createInstance(1,20,15);
      }
      return instance;
    }
  };
})();
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function generateWorld(){
    var instance = Singleton.getInstance(1,25,5);

    // var instance1 = Singleton.getInstance(1,20,15);
    var boardManager= new BoardManager();
    // debugger;
    boardManager.addBoard(50,"sketch-holder-1",new GrahamaScan());
    // boardManager.addBoard(50,"sketch-holder-2",new GrahamaScan());
    for(var i=0;i<boardManager.pool;i++){
      boardManager.listBoard[i].init();
      startSketch(boardManager.listBoard[i],instance);
    }
  }

function startSketch(board,instance){
  // var board=board;
  // var instance=instance;
  var sketch = function( p ) {
    
    p.setup = function() {
      var canvas=p.createCanvas(board.width, board.height);
      canvas.parent(board.id_skate_holder);
      p.background("#e3f2fd");
      p.frameRate(30);
    };
    
    p.draw = function() {
      if(!board.Stop()){
        p.clear();
        board.drawCircle(p);
        board.drawconvexHull(p);
      }
      else{
        p.noLoop();
      }
    };
  };
  var myp5 = new p5(sketch);
}

window.addEventListener("load", function() {
    // canvas = document.getElementById("sketch-holder");
    // setup();
    // canvas.width = width;
    // canvas.height = height;  
    generateWorld();
  });
