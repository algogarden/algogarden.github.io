class GiftWrapping extends Algorithm {
  constructor(world) {
    super();
    this.instance = world;
    this.leftMost = null;
    this.pointOnHull;
    this.endpoint;
    this.index;
    this.convexHull = [];
    this.represent = [];
    this.finish = false;
    this.name = "GrahamScan";
    this.covered_area = 0;
  }
  refresh() {
    this.leftMost = null;
    this.pointOnHull;
    this.endpoint;
    this.index;
    this.convexHull = [];
    this.represent = [];
    this.isruning = false;
    this.finish = false;
    this.covered_area = 0;
    this.init();
  }
  isrunning() {
    return this.isruning;
  }
  init() {
    this.findLeftMost();
    this.pointOnHull = this.leftMost;
    this.endpoint = this.instance.listBall[0];
    this.index = 1;
    this.convexHull.push(this.leftMost);
    this.covered_area = 0;
    this.inited = true;
  }

  playMusic() {
    this.isruning = true;
  }
  findLeftMost() {
    for (let ball of this.instance.listBall) {
      if (this.leftMost && ball.x < this.leftMost.x) this.leftMost = ball;
      else if (!this.leftMost) this.leftMost = ball;
    }
  }

  run() {
    let checking = this.instance.listBall[this.index];
    this.represent = [];
    this.represent.push(this.pointOnHull);
    this.represent.push(this.endpoint);
    this.represent.push(checking);
    if (
      (this.endpoint.x == this.pointOnHull.x &&
        this.endpoint.y == this.pointOnHull.y) ||
      this.crossProduct(checking, this.pointOnHull, this.endpoint) < 0
    ) {
      this.endpoint = checking;
    }
    this.index++;
    if (this.index == this.instance.numberOfBall) {
      if (this.endpoint == this.leftMost) {
        this.represent = [];
        this.finish = true;
      } else {
        this.convexHull.push(this.endpoint);
        this.pointOnHull = this.endpoint;
        this.index = 0;
      }
    }
    this.covered_area = 0;
    for (var i = 1; i < this.convexHull.length; i++) {
      this.covered_area +=
        (this.convexHull[i - 1].x * this.convexHull[i].y -
          this.convexHull[i - 1].y * this.convexHull[i].x) /
        2;
    }
    this.covered_area = Math.abs(this.covered_area);
  }

  crossProduct(a, b, c) {
    let vector1 = { x: b.x - a.x, y: b.y - a.y };
    let vector2 = { x: c.x - a.x, y: c.y - a.y };
    return vector1.x * vector2.y - vector1.y * vector2.x;
  }

  stop() {
    return this.finish;
  }

  draw(p) {
    p.algorithm.run();

    /* - Highlight circle in convexhull
          ================================================*/
    for (let i = 0; i < p.algorithm.convexHull.length; i++) {
      let c = p.color("#212121"); // Define color 'c'
      p.fill(c); // Use color variable 'c' as fill color
      p.noStroke(); // Don't draw a stroke around shapes
      p.circle(
        p.algorithm.convexHull[i].x,
        p.algorithm.convexHull[i].y,
        p.points.radius
      );
    }
    /*================================================*/

    /* - Draw convex hull
          ================================================*/
    p.beginShape();
    let c = p.color("rgba(189, 189, 189, 0.5)");
    p.fill(c);
    p.strokeWeight(0.5);
    p.stroke("#212121");
    p.vertex(p.algorithm.convexHull[0].x, p.algorithm.convexHull[0].y);
    for (let i = 1; i < p.algorithm.convexHull.length; i++) {
      p.vertex(p.algorithm.convexHull[i].x, p.algorithm.convexHull[i].y);
    }
    p.endShape(p.CLOSE);
    /*================================================*/

    /* - Draw represent
            ================================================*/
    if (p.algorithm.represent.length > 0) {
      p.beginShape();
      // let c = p.color("rgba(179, 229, 252, 0.5)");
      // p.fill(c);
      p.strokeWeight(0.5);
      p.stroke("#212121");
      p.vertex(p.algorithm.represent[0].x, p.algorithm.represent[0].y);
      for (let i = 1; i < p.algorithm.represent.length; i++) {
        p.vertex(p.algorithm.represent[i].x, p.algorithm.represent[i].y);
      }
      p.endShape(p.CLOSE);
    }
    /*================================================*/
    /* - Update score
            ================================================*/
    $("#" + p.id_skate_holder + " #iteration").text(
      parseInt($("#" + p.id_skate_holder + " #iteration").text()) + 1
    );
    $("#" + p.id_skate_holder + " #pointsinconvexhull").text(
      p.algorithm.convexHull.length
    );
    $("#" + p.id_skate_holder + " #coveredArea").text(p.algorithm.covered_area);

    /*================================================*/
  }
  drawInitPhase(p) {
    
    /* - draw init phase
                  ================================================*/
    let c = p.color("#212121"); // Define color 'c'
    p.fill(c); // Use color variable 'c' as fill color
    p.noStroke(); // Don't draw a stroke around shapes
    p.circle(
      p.algorithm.leftMost.x,
      p.algorithm.leftMost.y,
      p.points.radius * 1.5
    );
    p.text("Left Most Point",p.algorithm.leftMost.x-10,p.algorithm.leftMost.y+15);

    /*================================================*/
    
  }
}
