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
var timeToSleep = 200;
var canvas;
var width;
var height;
window.addEventListener("load", function() {
  canvas = document.getElementById("world");
  // width = getWidth();
  // height = getHeight();
  setup();
  //this.console.log(width, height, this.event.clientX)
  canvas.width = width;
  canvas.height = height;
});
function setup() {
  width = getWidth();
  height = getHeight();
  var canvas = createCanvas(width, height);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  background("#ffcdd2");
  
}

document.addEventListener("keydown", function(e) {
  if (e.keyCode == 37 && !runAlgorithm) {
    runGrahamaScan();
  }
});

var runAlgorithm = false;
var listBall;
var convexHull;
var radius = 10;
var numberOfBalls;
var ctx;
var listSortedPoint=[];
var currentVertex;
var startPoint;
var runGrahamaScan = async function() {
  runAlgorithm = true;
  listBall = [];
  convexHull = [];
  radius = 10;
  numberOfBalls = Math.floor(Math.random() * 50) + 50
  // numberOfBalls = 10;
  ctx = canvas.getContext("2d");
  polar_angle = [];
  //create balls
  for (let i = 0; i < numberOfBalls; i++) {
    let ball = {
      x: Math.floor(Math.random() * (width - 4 * radius)) + radius,
      y: Math.floor(Math.random() * (height - 15 * radius)) + 105 + radius
    };
    if (startPoint && ball.y > startPoint.y) {
      startPoint = ball;
    } else if (startPoint && ball.x < startPoint.x && ball.y == startPoint.y) {
      startPoint = ball;
    } else if (!startPoint) {
      startPoint = ball;
    }
    listBall.push(ball);
  }
  for (var i = 0; i < numberOfBalls; i++) {
    if (listBall[i].x != startPoint.x && listBall[i].y != startPoint.y) {
      listSortedPoint.push({
        index:i,
        value:dotProduct(listBall[i], startPoint) 
      });
    }
  }
  HeapSort();

  convexHull.push(startPoint);  
  convexHull.push(listBall[listSortedPoint[0].index])
  for(var i=1;i<listSortedPoint.length;i++){
    while(convexHull.length>1 
      &&
       (crossProduct(convexHull[convexHull.length-2],convexHull[convexHull.length-1],listBall[listSortedPoint[i].index])>0)){
        convexHull.pop();
        await drawCanvas()

    }
    convexHull.push(listBall[listSortedPoint[i].index]);
    await drawCanvas()
  }
};


var dotProduct = function(ball, startPoint) {
  let vector = {
    x: ball.x - startPoint.x,
    y: ball.y - startPoint.y
  };
  return vector.x / Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
};

var drawCanvas = async function() {
  clearCanvas();
  drawCircle();
  drawTest();
  drawConvexHull()
  await sleep(timeToSleep);
};
var drawCircle = function() {
  for (let i = 0; i < numberOfBalls; i++) {
    if (listBall[i] == currentVertex) {
      ctx.fillStyle = " #3385ff";
    } else {
      ctx.fillStyle = "#33cc33";
    }
    ctx.beginPath();
    ctx.arc(listBall[i].x, listBall[i].y, radius, 0, 2 * Math.PI);
    //ctx.fillStyle = 'green'
    ctx.fill();
    ctx.stroke();
  }
};

var drawTest = function() {
  for (let i = 0; i < listSortedPoint.length; i++) {
    ctx.font = '20px serif';
    ctx.fillText(i,  listBall[listSortedPoint[i].index].x, listBall[listSortedPoint[i].index].y-10  );
  }
};

var drawConvexHull = function() {
  ctx.beginPath();
  ctx.moveTo(convexHull[0].x, convexHull[0].y);
  for (let i = 1; i < convexHull.length; i++) {
    ctx.fillStyle = "black";

    ctx.lineTo(convexHull[i].x, convexHull[i].y);
    // ctx.moveTo(convexHull[i].x+radius, convexHull[i].y);
    // ctx.fillStyle = "red";
    ctx.arc(convexHull[i].x, convexHull[i].y, radius, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.lineTo(convexHull[i].x, convexHull[i].y);

  }
  ctx.lineTo(convexHull[0].x, convexHull[0].y);
  ctx.fill();
  // ctx.stroke();

  
};

var drawResult = function() {
  console.log("redraw final");
  drawTest();
  clearCanvas();
  drawCircle();
  drawConvexHull(convexHull);
};

var clearCanvas = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var crossProduct = function(a, b, c){
  // debugger
  let vector1 = {x: b.x - a.x, y: b.y - a.y}
  let vector2 = {x: c.x - a.x, y: c.y - a.y}
  return vector1.x * vector2.y - vector1.y * vector2.x
}

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

var Heapify = function(index,sizeHeap) {
  var chosenValue = index * 2 + 1;
  var rightChild = index * 2 + 2;
  if (rightChild < sizeHeap) {
    if (listSortedPoint[rightChild].value < listSortedPoint[chosenValue].value) {
      chosenValue = rightChild;
    }
  }
  if (listSortedPoint[chosenValue].value < listSortedPoint[index].value) {
    var temp = listSortedPoint[chosenValue];
    listSortedPoint[chosenValue] = listSortedPoint[index];
    listSortedPoint[index] = temp;
  }
};
var HeapSort = function() {
  var dem = listSortedPoint.length;
  while (dem > 0) {
    for (var i = (dem - 2) / 2; i >= 0; i--) {
      Heapify(parseInt(i),dem);
    }
    var temp = listSortedPoint[dem-1];
    listSortedPoint[dem-1] = listSortedPoint[0];
    listSortedPoint[0] = temp;
    dem--;
  }

};
