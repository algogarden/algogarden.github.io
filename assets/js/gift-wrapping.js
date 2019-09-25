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
  var timeToSleep = 16.66
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
      runGiftWrapping()
    }
  })
  
  var runAlgorithm = false;
  var listBall;
  var convexHull;
  var radius = 10
  var numberOfBalls;
  var ctx;
  var leftMost;
  var currentVertex;

var runGiftWrapping = async function(){
  runAlgorithm = true
  listBall = []
  convexHull = []
  radius = 10
  numberOfBalls = Math.floor(Math.random() * 50) + 50
  ctx = canvas.getContext("2d");

  leftMost = null
  //create balls
  for (let i = 0; i < numberOfBalls; i++){
      let ball = {
          x: Math.floor(Math.random() * (width - 4 * radius)) + radius, 
          y: Math.floor(Math.random() * (height - 15 * radius)) + 105 + radius
      }
      if (leftMost && ball.x < leftMost.x)
        leftMost = ball
      else if (!leftMost)
        leftMost = ball
      listBall.push(ball)
  }
  console.log(leftMost)
  currentVertex = leftMost
  let nextVertex = listBall[0]
  let index = 1
  convexHull.push(leftMost)
  
  for (index; ; ){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let checking = listBall[index]
    //console.log('redraw')
    drawCircle()
    drawConvexHull(convexHull)
    ctx.beginPath()
    ctx.moveTo(currentVertex.x, currentVertex.y)
    ctx.lineTo(nextVertex.x, nextVertex.y)
    ctx.moveTo(currentVertex.x, currentVertex.y)
    ctx.lineTo(checking.x, checking.y)
    ctx.stroke()
    let a = {x: nextVertex.x - currentVertex.x, y: nextVertex.y - currentVertex.y}
    let b = {x: checking.x - currentVertex.x, y: checking.y - currentVertex.y}
    let crossProduct = a.x * b.y - a.y * b.x
    //console.log('cross: ', cross)
    if (crossProduct < 0){
      //console.log("lest than 0")
        nextVertex = checking
    }
    index++
    if (index == numberOfBalls){
      if (nextVertex == leftMost){
        break
      }
      else{
        convexHull.push(nextVertex)
        currentVertex = nextVertex
        index = 0
        nextVertex = leftMost
        //console.log(convexHull)
      }
    }
    await sleep(timeToSleep)
  }
  drawResult()
  runAlgorithm = false
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

var drawConvexHull = function(convexHull){
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle()
  drawConvexHull(convexHull)
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
