export default class ConvexHull{
    constructor(sleepTime, cv, r){
        this.timeToSleep = sleepTime
        this.canvas = cv;
        this.canvas.width = this.getWidth();
        this.canvas.height = this.getHeight();
        this.runAlgorithm = false;
        this.listBall;
        this.convexHull;
        this.radius = r
        this.numberOfBalls;
        this.ctx = this.canvas.getContext("2d");
        this.leftMost;
        this.currentVertex;

        
    }

    getWidth() {
        return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
        );
      }
      
    getHeight() {
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.documentElement.clientHeight
        );
      }

    initBeforeRunAlgorithm(){
      this.runAlgorithm = true
      this.listBall = []
      this.convexHull = []
      this.numberOfBalls = Math.floor(Math.random() * 50) + 50
    }

    generateBalls(){
      for (let i = 0; i < this.numberOfBalls; i++) {
        let ball = {
            x: Math.floor(Math.random() * (this.canvas.width - 4 * this.radius)) + this.radius,
            y: Math.floor(Math.random() * (this.canvas.height - 15 * this.radius)) + 105 + this.radius
        };
        this.listBall.push(ball);
      }
    }

    async runConvexHull(){}

    clearCanvas(){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCircle(){
      for (let i = 0; i < this.numberOfBalls; i++){
        if (this.listBall[i] == this.currentVertex){
          this.ctx.fillStyle = ' #3385ff'
        }
        else {
          this.ctx.fillStyle = '#33cc33'
        }
        this.ctx.beginPath();
        this.ctx.arc(this.listBall[i].x, this.listBall[i].y, this.radius, 0, 2 * Math.PI)
        //ctx.fillStyle = 'green'
        this.ctx.fill()
        this.ctx.stroke();
      }
    }
    
    drawConvexHull(){
      this.ctx.beginPath()
      this.ctx.moveTo(this.convexHull[0].x, this.convexHull[0].y)
      for (let i = 1; i < this.convexHull.length; i++){
        this.ctx.lineTo(this.convexHull[i].x, this.convexHull[i].y)
      }
      this.ctx.lineTo(this.convexHull[0].x, this.convexHull[0].y)
      this.ctx.stroke()
    }

    async drawCanvas(sleep = this.timeToSleep){
      this.clearCanvas()
      this.drawCircle()
      this.drawConvexHull()
      await this.sleep(sleep)
    }

    async sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    crossProduct(a, b, c){
      let vector1 = {x: b.x - a.x, y: b.y - a.y}
      let vector2 = {x: c.x - a.x, y: c.y - a.y}
      return vector1.x * vector2.y - vector1.y * vector2.x
    }
}