//import GiftWrapping from "./GiftWrapping";

// import BoardManager from "./BoardManager.js";
// import World from "./World.js"
var Singleton = (function() {
  var instance = null;
  
  function createInstance(numberOfBall,radius) {
      var object = new World(numberOfBall,radius);
      return object;
  }
  return { // public interface
    Instance: function (numberOfBall = 20,radius = 15) {
      if (!instance) {
          instance = createInstance(numberOfBall,radius);
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
    Singleton.Instance(50,5); //number of points and radius

    // var instance1 = Singleton.getInstance(1,20,15);
    var boardManager= new BoardManager();
    // debugger;
    boardManager.addBoard("sketch-holder-1",new GrahamScan());
    boardManager.addBoard("sketch-holder-2",new GiftWrapping());
    for(var i=0;i<boardManager.pool;i++){
      boardManager.listBoard[i].init();
      startSketch(boardManager.listBoard[i]);
    }
  }

function startSketch(board){
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
