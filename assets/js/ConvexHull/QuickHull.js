import MyConvexHull from "./MyConvexHull.js";

export default class QuickHull extends MyConvexHull {
  constructor(sleepTime, cv, r) {
    super(sleepTime, cv, r);
    this.rightMost;
  }

  generateBalls() {
    //create balls
    for (let i = 0; i < this.numberOfBalls; i++) {
      let ball = {
        x: Math.floor(Math.random() * (this.canvas.width - 4 * this.radius)) + this.radius,
        y: Math.floor(Math.random() * (this.canvas.height - 15 * this.radius)) + 105 + this.radius
      };
      if (this.leftMost && ball.x < this.leftMost.x) {
        this.leftMost = ball;
      } else if (this.rightMost && ball.x > this.rightMost.x) {
        this.rightMost = ball;
      } else if (!this.leftMost && !this.rightMost) {
        this.leftMost = ball;
        this.rightMost = ball;
      }
      this.listBall.push(ball);
    }
  }

  async runConvexHull(){
    this.runAlgorithm = true
    this.listBall = []
    this.convexHull = []
    this.radius = 10
    this.numberOfBalls = Math.floor(Math.random() * 50) + 50
  
    this.leftMost = null
    this.rightMost = null
    
    this.generateBalls()
  
    this.convexHull.push(this.leftMost)
    await this.drawCanvas()
    //
    let S1 = []
    let S2 = []
    for (let i = 0; i < this.numberOfBalls; i++){
      if (this.listBall[i] != this.leftMost && this.listBall[i] != this.rightMost){
        if (this.crossProduct(this.leftMost, this.rightMost, this.listBall[i]) < 0){
          S1.push(this.listBall[i])
        }
        else {
          S2.push(this.listBall[i])
        }
      }
    }
    
    await this.quickHull(S1, this.leftMost, this.rightMost)
  
    this.convexHull.push(this.rightMost)
    await this.drawCanvas()
  
    await this.quickHull(S2, this.rightMost, this.leftMost)
  
    this.runAlgorithm = false
  }

  async quickHull(S, A, B) {
    if (S.length == 0) return
    let farthest;
    let farthestDistance = 0
    for (let i = 0; i < S.length; i++){
      let temp = this.heightSquare(A, B, S[i])
      if (temp > farthestDistance){
        farthest = S[i]
        farthestDistance = temp
      }
    }
    
    let S1 = []
    let S2 = []
    for (let i = 0; i < S.length; i++){
      if (this.crossProduct(A, farthest, S[i]) < 0){
        S1.push(S[i])
      }
      else if (this.crossProduct(farthest, B, S[i]) < 0){
        S2.push(S[i])
      }
    }
  
    await this.quickHull(S1, A, farthest)
  
    this.convexHull.push(farthest)
    await this.drawCanvas()
  
    await this.quickHull(S2, farthest, B)
  }

  heightSquare(A, B, C){
    let a = Math.sqrt(Math.pow(B.x - A.x, 2) +  Math.pow(B.y - A.y, 2))
    let b = Math.sqrt(Math.pow(B.x - C.x, 2) +  Math.pow(B.y - C.y, 2)) 
    let c = Math.sqrt(Math.pow(C.x - A.x, 2) +  Math.pow(C.y - A.y, 2))
    let p = (a + b+ c) / 2
    let squareArea = Math.sqrt(p * (p - a) * (p - b) * (p - c))
    return 4 * squareArea / a
  }
}
