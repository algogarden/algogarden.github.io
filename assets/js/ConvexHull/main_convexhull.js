//import GiftWrapping from "./GiftWrapping";

// import BoardManager from "./BoardManager.js";
// import World from "./World.js"
var Singleton = (function(width,height,numberOfBall,radius) {
  var instance = null;
  function createInstance(width,height,numberOfBall, radius) {
    var object = new World(width,height,numberOfBall, radius);
    return object;
  }
  return {
    // public interface
    Instance: function(width,height,numberOfBall, radius) {
      if (!instance) {
        instance = createInstance(width,height,numberOfBall, radius);
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

// function generateWorld() {
//   Singleton.Instance(1000, 5); //number of points and radius

//   // var instance1 = Singleton.getInstance(1,20,15);
//   var boardManager = new BoardManager();
//   // debugger;
//   boardManager.addBoard("sketch-holder-1", new GiftWrapping());
//   boardManager.addBoard("sketch-holder-2", new GrahamScan());
//   boardManager.addBoard("sketch-holder-3", new QuickHull());
//   for (var i = 0; i < boardManager.pool; i++) {
//     boardManager.listBoard[i].run();
//   }
// }

// window.addEventListener("load", function() {
//   // canvas = document.getElementById("sketch-holder");
//   // setup();
//   // canvas.width = width;
//   // canvas.height = height;
//   generateWorld();
// });
