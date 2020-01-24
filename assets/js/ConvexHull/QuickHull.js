class QuickHull extends Algorithm {
  constructor(world) {
    super();
    this.instance = world;
    this.leftMost = null;
    this.rightMost = null;
    this.currentVertex;
    this.nextVertex;
    this.index;
    this.convexHull = [];
    this.stack = [];
    this.S = null;
    this.finish = false;
    this.name="QuickHull";

  }
  refresh() {
    this.leftMost = null;
    this.rightMost = null;
    this.currentVertex;
    this.nextVertex;
    this.index;
    this.convexHull = [];
    this.stack = [];
    this.S = null;
    this.isruning = false;
    this.finish = false;
    this.covered_area = 0;
    this.init();
  }
  playMusic() {
    this.isruning = true;
  }
  findLeftMostRightMost() {
    for (let ball of this.instance.listBall) {
      if (this.leftMost && ball.x < this.leftMost.x) {
        this.leftMost = ball;
      } else if (this.rightMost && ball.x > this.rightMost.x) {
        this.rightMost = ball;
      } else if (!this.leftMost && !this.rightMost) {
        this.leftMost = ball;
        this.rightMost = ball;
      }
    }
  }
  init() {
    this.findLeftMostRightMost();
    this.convexHull.push(this.leftMost);
    this.convexHull.push(this.rightMost);

    let S1 = [];
    let S2 = [];

    for (let i = 0; i < this.instance.numberOfBall; i++) {
      if (
        this.instance.listBall[i] != this.leftMost &&
        this.instance.listBall[i] != this.rightMost
      ) {
        if (
          this.crossProduct(
            this.instance.listBall[i],
            this.leftMost,
            this.rightMost,
            
          ) < 0
        ) {
          S1.push(this.instance.listBall[i]);
        } else {
          S2.push(this.instance.listBall[i]);
        }
      }
    }
    let data1 = {
      arr: S1,
      left: this.leftMost,
      right: this.rightMost,
      side: "left",
      parent: this.rightMost.id
    };
    let data2 = {
      arr: S2,
      left: this.rightMost,
      right: this.leftMost,
      side: "right",
      parent: this.rightMost.id
    };
    this.stack.push(data2);
    this.stack.push(data1);
    this.inited=true;

  }

  run() {
    let S = this.stack.pop();
    if (S.arr.length != 0) {
      let farthest;
      let farthestDistance = 0;
      for (let i = 0; i < S.arr.length; i++) {
        let temp = this.heightSquare(S.left, S.right, S.arr[i]);
        if (temp > farthestDistance) {
          farthest = S.arr[i];
          farthestDistance = temp;
        }
      }

      this.insertToConvexHull(S, farthest);

      let S1 = [];
      let S2 = [];
      for (let i = 0; i < S.arr.length; i++) {
        if (this.crossProduct(S.left, farthest, S.arr[i]) < 0) {
          S1.push(S.arr[i]);
        } else if (this.crossProduct(farthest, S.right, S.arr[i]) < 0) {
          S2.push(S.arr[i]);
        }
      }
      let data1 = {
        arr: S1,
        left: S.left,
        right: farthest,
        side: "left",
        parent: farthest.id
      };
      let data2 = {
        arr: S2,
        left: farthest,
        right: S.right,
        side: "right",
        parent: farthest.id
      };
      this.stack.push(data2);
      this.stack.push(data1);
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

  draw(p){
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

  drawInitPhase(p){
    let c = p.color("#212121"); // Define color 'c'
    p.fill(c); // Use color variable 'c' as fill color
    p.noStroke(); // Don't draw a stroke around shapes
    let data1=this.stack[0];
    let data2=this.stack[1];

    p.circle(
      data1.left.x, data1.left.y,
      p.points.radius * 1.5
    );
    p.text("Right Most Point",data1.left.x-40, data1.left.y+15);
    p.circle(
      data1.right.x, data1.right.y,
      p.points.radius * 1.5
    );
    p.text("Left Most Point",data1.right.x-20, data1.right.y+15);
    p.beginShape();
    // let c = p.color("rgba(179, 229, 252, 0.5)");
    // p.fill(c);
    p.strokeWeight(0.5);
    p.stroke("#212121");
    p.vertex(data1.left.x, data1.left.y);
    p.vertex(data2.left.x, data2.left.y);
    p.endShape(p.CLOSE);
    for (let i = 0; i < data1.arr.length; i++) {
      let c = p.color("#90a4ae"); // Define color 'c'
      p.fill(c); // Use color variable 'c' as fill color
      // noStroke(); // Don't draw a stroke around shapes
      p.circle(
        data1.arr[i].x,
        data1.arr[i].y,
        p.points.radius
      );
      }
      for (let i = 0; i < data2.arr.length; i++) {
        let c = p.color("#a1887f"); // Define color 'c'
        p.fill(c); // Use color variable 'c' as fill color
        // noStroke(); // Don't draw a stroke around shapes
        p.circle(
          data2.arr[i].x,
          data2.arr[i].y,
          p.points.radius
        );
    }

  }

  stop() {
    return this.stack.length == 0;
  }

  heightSquare(A, B, C) {
    let a = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
    let b = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
    let c = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
    let p = (a + b + c) / 2;
    let squareArea = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    return (4 * squareArea) / a;
  }

  crossProduct(a, b, c) {
    let vector1 = { x: b.x - a.x, y: b.y - a.y };
    let vector2 = { x: c.x - a.x, y: c.y - a.y };
    return vector1.x * vector2.y - vector1.y * vector2.x;
  }

  insertToConvexHull(S, farthest) {
    for (let i = 0; i < this.convexHull.length; i++) {
      if (S.parent == this.convexHull[i].id) {
        if (S.side == "left") {
          this.convexHull.splice(i, 0, farthest);
          return;
        } else {
          this.convexHull.splice(i + 1, 0, farthest);
          return;
        }
      }
    }
  }
}
