

class World{

    constructor(numberOfBall,radius) {
        //this.pool = pool;
        this.numberOfBall = numberOfBall;
        this.radius = radius;
        this.listBall=[];
        var front = document.getElementsByClassName("front");
        var width = front[0].offsetWidth;
        var height =front[0].offsetHeight;
        for (let i = 0; i < this.numberOfBall; i++) {
            let ball = {
              x: Math.floor(Math.random() * (width - 8* this.radius)) + 4*this.radius,
              y: Math.floor(Math.random() * (height - 8 * this.radius)) + 4*this.radius
            };
            // if (startPoint && ball.y > startPoint.y) {
            //   startPoint = ball;
            // } else if (startPoint && ball.x < startPoint.x && ball.y == startPoint.y) {
            //   startPoint = ball;
            // } else if (!startPoint) {
            //   startPoint = ball;
            // }
            this.listBall.push(ball);
          }
    }
}
