class GrahamScan extends Algorithm{
  constructor() {
    super(); // exception thrown here when not called
    this.instance = Singleton.Instance();
    this.startPoint = 0;
    this.convexHull = [];
    this.listSortedPoint = [];
    this.count = 0;
    this.name="GrahamScan";
  }

  Heapify(index, sizeHeap) {
    var chosenValue = index * 2 + 1;
    var rightChild = index * 2 + 2;
    if (rightChild < sizeHeap) {
      if (
        this.listSortedPoint[rightChild].value <
        this.listSortedPoint[chosenValue].value
      ) {
        chosenValue = rightChild;
      }
    }
    if (
      this.listSortedPoint[chosenValue].value <
      this.listSortedPoint[index].value
    ) {
      var temp = this.listSortedPoint[chosenValue];
      this.listSortedPoint[chosenValue] = this.listSortedPoint[index];
      this.listSortedPoint[index] = temp;
    }
  }

  HeapSort() {
    var dem = this.listSortedPoint.length;
    while (dem > 0) {
      for (var i = (dem - 2) / 2; i >= 0; i--) {
        this.Heapify(parseInt(i), dem);
      }
      var temp = this.listSortedPoint[dem - 1];
      this.listSortedPoint[dem - 1] = this.listSortedPoint[0];
      this.listSortedPoint[0] = temp;
      dem--;
    }
  }

  findMostUnderLeftPoint() {
    for (let i = 0; i < this.instance.numberOfBall; i++) {
      if (
        this.startPoint &&
        this.instance.listBall[i].y > this.instance.listBall[this.startPoint].y
      ) {
        this.startPoint = i;
      } else if (
        this.startPoint &&
        this.instance.listBall[i].x <
          this.instance.listBall[this.startPoint].x &&
        this.instance.listBall[i].y == this.instance.listBall[this.startPoint].y
      ) {
        this.startPoint = i;
      } else if (!this.startPoint) {
        this.startPoint = i;
      }
    }
  }

  dotProduct(ball, startPoint) {
    let vector = {
      x: ball.x - startPoint.x,
      y: ball.y - startPoint.y
    };
    return vector.x / Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
  }

  calculateAndSort() {
    for (var i = 0; i < this.instance.numberOfBall; i++) {
      if (
        this.instance.listBall[i].x !=
          this.instance.listBall[this.startPoint].x &&
        this.instance.listBall[i].y != this.instance.listBall[this.startPoint].y
      ) {
        this.listSortedPoint.push({
          index: i,
          value: this.dotProduct(
            this.instance.listBall[i],
            this.instance.listBall[this.startPoint]
          )
        });
      }
    }
    this.HeapSort();
  }
  init() {
    this.findMostUnderLeftPoint();
    this.calculateAndSort();
    this.convexHull.push(this.instance.listBall[this.startPoint]);
    this.convexHull.push(this.instance.listBall[this.listSortedPoint[0].index]);
    this.count = 0;
  }

  stop() {
    return this.count >= this.listSortedPoint.length;
  }

  crossProduct(a, b, c) {
    let vector1 = { x: b.x - a.x, y: b.y - a.y };
    let vector2 = { x: c.x - a.x, y: c.y - a.y };
    return vector1.x * vector2.y - vector1.y * vector2.x;
  }
 
  run() {
    if (this.count < this.listSortedPoint.length) {
      var i = this.count;
      while (
        this.convexHull.length > 1 &&
        this.crossProduct(
          this.convexHull[this.convexHull.length - 2],
          this.convexHull[this.convexHull.length - 1],
          this.instance.listBall[this.listSortedPoint[i].index]
        ) > 0
      ) {
        this.convexHull.pop();
        return;
      }
      this.convexHull.push(
        this.instance.listBall[this.listSortedPoint[i].index]
      );
      this.count++;
    }
    // console.log("convexHull ");
    // console.log(this.convexHull);
  }

//   drawCircle(p) {
//     p.noStroke();
//     // debugger;
//    for (let i = 0; i < this.instance.listBall.length; i++){
//        let c = p.color("#33cc33"); // Define color 'c'
//        p.fill(c); // Use color variable 'c' as fill color
//        // noStroke(); // Don't draw a stroke around shapes      
//        p.circle(this.instance.listBall[i].x, this.instance.listBall[i].y,this.instance.radius);
//    }

//    for(let i=0;i<this.convexHull.length;i++){
//      let c = p.color("#039be5"); // Define color 'c'
//      p.fill(c); // Use color variable 'c' as fill color
//      p.noStroke(); // Don't draw a stroke around shapes      
//      p.circle(this.convexHull[i].x, this.convexHull[i].y,this.instance.radius);
//    }
//  };

//  drawconvexHull(p) {
//   p.beginShape();
//   let c= p.color('rgba(179, 229, 252, 0.5)');
//   p.fill(c);
//   p.strokeWeight(0.5);
//   p.stroke("#039be5");
//   p.vertex(this.convexHull[0].x,this.convexHull[0].y);
//   for (let i = 1; i < this.convexHull.length; i++) {
//     p.vertex(this.convexHull[i].x, this.convexHull[i].y)
//   }
//   p.endShape(p.CLOSE);
// };


}
