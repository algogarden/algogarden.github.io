// function getWidth() {
//   return Math.max(
//     document.body.scrollWidth,
//     document.documentElement.scrollWidth,
//     document.body.offsetWidth,
//     document.documentElement.offsetWidth,
//     document.documentElement.clientWidth
//   );
// }

// function getHeight() {
//   return Math.max(
//     document.body.scrollHeight,
//     document.documentElement.scrollHeight,
//     document.body.offsetHeight,
//     document.documentElement.offsetHeight,
//     document.documentElement.clientHeight
//   );
// }
// var timeToSleep = 50;
// var canvas;
// var width;
// var height;

// function setup() {
//   width = getWidth();
//   height = getHeight();
//   var canvas = createCanvas(width, height);
 
//   // Move the canvas so it’s inside our <div id="sketch-holder">.
//   canvas.parent('sketch-holder');
  
// }

// document.addEventListener("keydown", function(e) {
//   if (e.keyCode == 37 && !runAlgorithm) {
//     runGrahamaScan();
//   }
// });

// var runAlgorithm = false;
// var listBall;
// var convexHull;
// var radius = 15;
// var numberOfBalls;
// var listSortedPoint=[];
// var startPoint;
// var runGrahamaScan = async function() {
//   runAlgorithm = true;
//   listBall = [];
//   convexHull = [];
//   numberOfBalls = Math.floor(Math.random() * 50) + 50
//   polar_angle = [];
//   //create balls
//   for (let i = 0; i < numberOfBalls; i++) {
//     let ball = {
//       x: Math.floor(Math.random() * (width - 4 * radius)) + radius,
//       y: Math.floor(Math.random() * (height - 15 * radius)) + 105 + radius
//     };
//     if (startPoint && ball.y > startPoint.y) {
//       startPoint = ball;
//     } else if (startPoint && ball.x < startPoint.x && ball.y == startPoint.y) {
//       startPoint = ball;
//     } else if (!startPoint) {
//       startPoint = ball;
//     }
//     listBall.push(ball);
//   }
//   for (var i = 0; i < numberOfBalls; i++) {
//     if (listBall[i].x != startPoint.x && listBall[i].y != startPoint.y) {
//       listSortedPoint.push({
//         index:i,
//         value:dotProduct(listBall[i], startPoint) 
//       });
//     }
//   }
//   HeapSort();

//   convexHull.push(startPoint);  
//   convexHull.push(listBall[listSortedPoint[0].index])
//   for(var i=1;i<listSortedPoint.length;i++){
//     while(convexHull.length>1 
//       &&
//        (crossProduct(convexHull[convexHull.length-2],convexHull[convexHull.length-1],listBall[listSortedPoint[i].index])>0)){
//         convexHull.pop();
//         await drawCanvas()

//     }
//     convexHull.push(listBall[listSortedPoint[i].index]);
//     await drawCanvas()
//   }
// };


// var dotProduct = function(ball, startPoint) {
//   let vector = {
//     x: ball.x - startPoint.x,
//     y: ball.y - startPoint.y
//   };
//   return vector.x / Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
// };

var drawCanvas = async function() {
  clear();
  drawCircle();
  // drawTest();
  drawConvexHull()
  await sleep(timeToSleep);
};
// var drawCircle = function() {
//    noStroke();

//   for (let i = 0; i < numberOfBalls; i++){
//       let c = color("#33cc33"); // Define color 'c'
//       fill(c); // Use color variable 'c' as fill color
//       // noStroke(); // Don't draw a stroke around shapes      
//       circle(listBall[i].x, listBall[i].y,radius);

//   }
//   for(let i=0;i<convexHull.length;i++){
//     let c = color("#039be5"); // Define color 'c'
//     fill(c); // Use color variable 'c' as fill color
//     noStroke(); // Don't draw a stroke around shapes      
//     circle(convexHull[i].x, convexHull[i].y,radius);
//   }

// };

// // var drawTest = function() {
// //   for (let i = 0; i < listSortedPoint.length; i++) {
// //     ctx.font = '20px serif';
// //     ctx.fillText(i,  listBall[listSortedPoint[i].index].x, listBall[listSortedPoint[i].index].y-10  );
// //   }
// // };

// var drawConvexHull = function() {
//   beginShape();
//   let c= color('rgba(179, 229, 252, 0.5)');
//   fill(c);
//   strokeWeight(2);
//   stroke("#039be5");
//   vertex(convexHull[0].x,convexHull[0].y);
//   for (let i = 1; i < convexHull.length; i++) {
//     vertex(convexHull[i].x, convexHull[i].y)
//   }
//   vertex(convexHull[0].x,convexHull[0].y);

// endShape();
// };

// var drawResult = function() {
//   // drawTest();
//   clearCanvas();
//   drawCircle();
//   drawConvexHull(convexHull);
// };

// // var clearCanvas = function() {
// //   ctx.clearRect(0, 0, canvas.width, canvas.height);
// // };

// var crossProduct = function(a, b, c){
//   // debugger
//   let vector1 = {x: b.x - a.x, y: b.y - a.y}
//   let vector2 = {x: c.x - a.x, y: c.y - a.y}
//   return vector1.x * vector2.y - vector1.y * vector2.x
// }

// const sleep = milliseconds => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds));
// };

// var Heapify = function(index,sizeHeap) {
//   var chosenValue = index * 2 + 1;
//   var rightChild = index * 2 + 2;
//   if (rightChild < sizeHeap) {
//     if (listSortedPoint[rightChild].value < listSortedPoint[chosenValue].value) {
//       chosenValue = rightChild;
//     }
//   }
//   if (listSortedPoint[chosenValue].value < listSortedPoint[index].value) {
//     var temp = listSortedPoint[chosenValue];
//     listSortedPoint[chosenValue] = listSortedPoint[index];
//     listSortedPoint[index] = temp;
//   }
// };
// var HeapSort = function() {
//   var dem = listSortedPoint.length;
//   while (dem > 0) {
//     for (var i = (dem - 2) / 2; i >= 0; i--) {
//       Heapify(parseInt(i),dem);
//     }
//     var temp = listSortedPoint[dem-1];
//     listSortedPoint[dem-1] = listSortedPoint[0];
//     listSortedPoint[0] = temp;
//     dem--;
//   }

// };
