class GiftWrapping extends Algorithm{
  constructor() {
    super();
    this.instance = Singleton.Instance();
    this.leftMost = null;
    this.currentVertex;
    this.nextVertex;
    this.index;
    this.convexHull = [];
    this.finish = false;
    this.name="GrahamScan";

  }

  init() {
    this.findLeftMost();
    console.log("leftMost", this.leftMost);

    this.currentVertex = this.leftMost;
    this.nextVertex = this.instance.listBall[0];
    this.index = 1;
    this.convexHull.push(this.leftMost);
  }

  findLeftMost() {
    for (let ball of this.instance.listBall) {
      if (this.leftMost && ball.x < this.leftMost.x) this.leftMost = ball;
      else if (!this.leftMost) this.leftMost = ball;
    }
  }

  run() {
    let checking = this.instance.listBall[this.index];

    if (this.crossProduct(this.currentVertex, this.nextVertex, checking) < 0) {
      this.nextVertex = checking;
    }
    this.index++;
    if (this.index == this.instance.numberOfBall) {
      if (this.nextVertex == this.leftMost) {
        this.finish = true;
      } else {
        this.convexHull.push(this.nextVertex);
        this.currentVertex = this.nextVertex;
        this.index = 0;
        this.nextVertex = this.leftMost;
      }
    }
  }

  crossProduct(a, b, c) {
    let vector1 = { x: b.x - a.x, y: b.y - a.y };
    let vector2 = { x: c.x - a.x, y: c.y - a.y };
    return vector1.x * vector2.y - vector1.y * vector2.x;
  }

  stop() {
    return this.finish;
  }
}
