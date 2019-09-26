import MyConvexHull from './MyConvexHull.js'

export default class GiftWrapping extends MyConvexHull{
    constructor(sleepTime, cv, r){
        super(sleepTime, cv, r)
    }

    generateBalls(){
        for (let i = 0; i < this.numberOfBalls; i++) {
        let ball = {
            x: Math.floor(Math.random() * (this.canvas.width - 4 * this.radius)) + this.radius,
            y: Math.floor(Math.random() * (this.canvas.height - 15 * this.radius)) + 105 + this.radius
        };
        if (this.leftMost && ball.x < this.leftMost.x) this.leftMost = ball;
        else if (!this.leftMost) this.leftMost = ball;
        this.listBall.push(ball);
        }
    }

    async runConvexHull(){
        this.initBeforeRunAlgorithm()

        this.leftMost = null

        this.generateBalls()

        this.currentVertex = this.leftMost
        
        let nextVertex = this.listBall[0]
        let index = 1
        this.convexHull.push(this.leftMost)
  
        for (index; ; ){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            let checking = this.listBall[index]
            //console.log('redraw')
            this.drawCanvas(0)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentVertex.x, this.currentVertex.y)
            this.ctx.lineTo(nextVertex.x, nextVertex.y)
            this.ctx.moveTo(this.currentVertex.x, this.currentVertex.y)
            this.ctx.lineTo(checking.x, checking.y)
            this.ctx.stroke()
            
            //console.log('cross: ', cross)
            if (this.crossProduct(this.currentVertex, nextVertex, checking) < 0){
            //console.log("lest than 0")
                nextVertex = checking
            }
            index++
            if (index == this.numberOfBalls){
            if (nextVertex == this.leftMost){
                break
            }
            else{
                this.convexHull.push(nextVertex)
                this.currentVertex = nextVertex
                index = 0
                nextVertex = this.leftMost
                //console.log(convexHull)
            }
            }
            await this.sleep(this.timeToSleep)
        }
        this.drawCanvas(0)
        this.runAlgorithm = false
    }
}