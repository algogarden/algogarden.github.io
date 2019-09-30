class Board {
  constructor(id_skate_holder, algorithm) {
    var front = document.getElementsByClassName("front");
    this.width = front[0].offsetWidth;
    this.height = front[0].offsetHeight;
    this.id_skate_holder = id_skate_holder;
    this.instance = Singleton.Instance();
    this.algorithm = algorithm;
  }

  drawCircle(p) {
    p.noStroke();
    for (let i = 0; i < this.instance.listBall.length; i++) {
      let c = p.color("#33cc33"); // Define color 'c'
      p.fill(c); // Use color variable 'c' as fill color
      // noStroke(); // Don't draw a stroke around shapes
      p.circle(
        this.instance.listBall[i].x,
        this.instance.listBall[i].y,
        this.instance.radius
      );
    }

    for (let i = 0; i < this.algorithm.convexHull.length; i++) {
      let c = p.color("#039be5"); // Define color 'c'
      p.fill(c); // Use color variable 'c' as fill color
      p.noStroke(); // Don't draw a stroke around shapes
      p.circle(
        this.algorithm.convexHull[i].x,
        this.algorithm.convexHull[i].y,
        this.instance.radius
      );
    }
  }

  drawconvexHull(p) {
    p.beginShape();
    let c = p.color("rgba(179, 229, 252, 0.5)");
    p.fill(c);
    p.strokeWeight(0.5);
    p.stroke("#039be5");
    p.vertex(this.algorithm.convexHull[0].x, this.algorithm.convexHull[0].y);
    for (let i = 1; i < this.algorithm.convexHull.length; i++) {
      p.vertex(this.algorithm.convexHull[i].x, this.algorithm.convexHull[i].y);
    }
    p.endShape(p.CLOSE);
  }

  async run() {
    // this.algorithm.run();
    let width = this.width;
    let height = this.height;
    let algorithm = this.algorithm;
    new p5(function(p) {
      p.setup = function() {
        p.createCanvas(width, height);
        // canvas.parent(this.id_skate_holder);
        algorithm.init();
        p.background("#e3f2fd");
        p.frameRate(30);
      };

      p.draw = function() {
        if (!algorithm.stop()) {
          algorithm.run();
          p.clear();
          algorithm.drawCircle(p);
          algorithm.drawconvexHull(p);
        } else {
          p.noLoop();
        }
      };
    }, this.id_skate_holder);
  }
  init() {
    this.algorithm.init();
  }
  Stop() {
    if (!this.algorithm.stop()) {
      this.run();
      return false;
    } else return true;
  }
}
