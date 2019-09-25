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
  var timeToSleep = 100
  var canvas;
  var width;
  var height;
  window.addEventListener('load', function(){
    canvas = document.getElementById("world");
    width = getWidth()
    height = getHeight()
    //this.console.log(width, height, this.event.clientX)
    canvas.width = width
    canvas.height = height
  })
  
  document.addEventListener('keydown', function(e){
    if (e.keyCode == 37 && !runAlgorithm){
      runQuickHull()
    }
  })
  
  var runAlgorithm = false;
  var listBall;
  var convexHull;
  var radius = 10
  var numberOfBalls;
  var ctx;
  var leftMost;
  var rightMost;
  var currentVertex;

var runQuickHull = async function(){
  runAlgorithm = true
  listBall = []
  convexHull = []
  radius = 10
  numberOfBalls = Math.floor(Math.random() * 50) + 50
  ctx = canvas.getContext("2d");

  leftMost = null
  rightMost = null
  //create balls
  for (let i = 0; i < numberOfBalls; i++){
      let ball = {
          x: Math.floor(Math.random() * (width - 4 * radius)) + radius, 
          y: Math.floor(Math.random() * (height - 15 * radius)) + 105 + radius
      }
      if (leftMost && ball.x < leftMost.x){
        leftMost = ball
      }
      else if (rightMost && ball.x > rightMost.x){
        rightMost = ball
      }
      else if (!leftMost && !rightMost){
        leftMost = ball
        rightMost = ball
      }
      listBall.push(ball)
  }

  convexHull.push(leftMost)
  await drawCanvas()
  //
  let S1 = []
  let S2 = []
  for (let i = 0; i < numberOfBalls; i++){
    if (listBall[i] != leftMost && listBall[i] != rightMost){
      if (crossProduct(leftMost, rightMost, listBall[i]) < 0){
        S1.push(listBall[i])
      }
      else {
        S2.push(listBall[i])
      }
    }
  }
  
  let spliceIndex = 1;
  await quickHull(S1, leftMost, rightMost, spliceIndex)

  convexHull.push(rightMost)
  await drawCanvas()

  await quickHull(S2, rightMost, leftMost)

  runAlgorithm = false
}

var quickHull = async function(S, A, B, indexTosplice) {
  if (S.length == 0) return
  let farthest;
  let farthestDistance = 0
  for (i = 0; i < S.length; i++){
    let temp = heightSquare(A, B, S[i])
    if (temp > farthestDistance){
      farthest = S[i]
      farthestDistance = temp
    }
  }
  
  let S1 = []
  let S2 = []
  for (i = 0; i < S.length; i++){
    if (crossProduct(A, farthest, S[i]) < 0){
      S1.push(S[i])
    }
    else if (crossProduct(farthest, B, S[i]) < 0){
      S2.push(S[i])
    }
  }

  await quickHull(S1, A, farthest)

  convexHull.push(farthest)
  await drawCanvas()

  await quickHull(S2, farthest, B)
}

var drawCanvas = async function(){
  clearCanvas()
  drawCircle()
  drawConvexHull()
  await sleep(timeToSleep)
}

var drawCircle = function (){
  for (let i = 0; i < numberOfBalls; i++){
    if (listBall[i] == currentVertex){
      ctx.fillStyle = ' #3385ff'
    }
    else {
      ctx.fillStyle = '#33cc33'
    }
    ctx.beginPath();
    ctx.arc(listBall[i].x, listBall[i].y, radius, 0, 2 * Math.PI)
    //ctx.fillStyle = 'green'
    ctx.fill()
    ctx.stroke();
  }
}

var drawConvexHull = function(){
  ctx.beginPath()
  ctx.moveTo(convexHull[0].x, convexHull[0].y)
  for (let i = 1; i < convexHull.length; i++){
    ctx.lineTo(convexHull[i].x, convexHull[i].y)
  }
  ctx.lineTo(convexHull[0].x, convexHull[0].y)
  ctx.stroke()
}

var drawResult = function(){
  console.log('redraw final')
  clearCanvas()
  drawCircle()
  drawConvexHull(convexHull)
}

var clearCanvas = function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var crossProduct = function(a, b, c){
  let vector1 = {x: b.x - a.x, y: b.y - a.y}
  let vector2 = {x: c.x - a.x, y: c.y - a.y}
  return vector1.x * vector2.y - vector1.y * vector2.x
}

var heightSquare = function(A, B, C){
  let a = Math.sqrt(Math.pow(B.x - A.x, 2) +  Math.pow(B.y - A.y, 2))
  let b = Math.sqrt(Math.pow(B.x - C.x, 2) +  Math.pow(B.y - C.y, 2)) 
  let c = Math.sqrt(Math.pow(C.x - A.x, 2) +  Math.pow(C.y - A.y, 2))
  let p = (a + b+ c) / 2
  let squareArea = Math.sqrt(p * (p - a) * (p - b) * (p - c))
  return 4 * squareArea / a
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
