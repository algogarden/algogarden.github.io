class World {
  constructor(width,height,numberOfBall, radius) {
    //this.pool = pool;
    this.numberOfBall = numberOfBall;
    this.radius = radius;
    this.listBall = [];
    var width = width;
    var height = height;
    for (let i = 0; i < this.numberOfBall; i++) {
      let ball = {
        id: i,
        x:
          Math.floor(Math.random() * (width - 8 * this.radius)) +
          4 * this.radius,
        y:
          Math.floor(Math.random() * (height - 8 * this.radius)) +
          4 * this.radius
      };
      this.listBall.push(ball);
    }
  }
}
