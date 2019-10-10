class QuickHull extends Algorithm {
  constructor() {
    super();
    this.instance = Singleton.Instance();
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
            this.leftMost,
            this.rightMost,
            this.instance.listBall[i]
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
