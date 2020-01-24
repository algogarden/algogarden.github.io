class Board {
  constructor(world, point, sleep, id_skate_holder, algorithm) {
    var $board = $("#" + id_skate_holder+"-canvas");
    this.width = $board[0].offsetWidth;
    this.height = $board[0].offsetHeight;
    this.id_skate_holder = id_skate_holder;
    this.world = world;
    this.algorithm = algorithm;
    this.point = point;
  }
  setWorld(world) {
    this.world = world;
    this.algorithm.setWorld(world);
    this.canvas.points = this.world;
  }

  clean() {
    this.algorithm.refresh();
    this.canvas.refresh();
  }

  drawCircle(p) {
    p.noStroke();
    for (let i = 0; i < this.world.listBall.length; i++) {
      let c = p.color("#33cc33"); // Define color 'c'
      p.fill(c); // Use color variable 'c' as fill color
      // noStroke(); // Don't draw a stroke around shapes
      p.circle(
        this.world.listBall[i].x,
        this.world.listBall[i].y,
        this.world.radius
      );
    }

    for (let i = 0; i < this.algorithm.convexHull.length; i++) {
      let c = p.color("#039be5"); // Define color 'c'
      p.fill(c); // Use color variable 'c' as fill color
      p.noStroke(); // Don't draw a stroke around shapes
      p.circle(
        this.algorithm.convexHull[i].x,
        this.algorithm.convexHull[i].y,
        this.world.radius
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
          // $("#"+id).parent().parent().parent().css("transform", "rotateY(180deg)");
          p.noLoop();
          // $("#" + id)
          //   .parent()
          //   .parent()
          //   .hover(
          //     function() {
          //       $(this).addClass("do-flip");
          //     },
          //     function() {
          //       $(this).removeClass("do-flip");
          //     }
          //   );
          // $("#" + id).trigger("mouseenter");
          // var child = '<p style="color:#2196f3">' + algorithm.name + "</p>";
          // $("#" + id + "-back")
          //   .empty()
          //   .html(child);
        }
      };
    }, this.id_skate_holder);
  }
  init() {
    this.algorithm.init();
    this.canvas.algorithm = this.algorithm;
  }

  play(){
    this.algorithm.playMusic();
    this.canvas.algorithm = this.algorithm;
  }
  Stop() {
    if (!this.algorithm.stop()) {
      this.run();
      return false;
    } else return true;
  }

  plotPoints() {
    let width = this.width;
    let height = this.height;
    let algorithm = this.algorithm;
    let points = this.world;
    let id_skate_holder = this.id_skate_holder;
    this.canvas = new p5(function(p) {
      p.points = points;
      p.algorithm = algorithm;
      p.id_skate_holder = id_skate_holder;
      p.setup = function() {
        p.createCanvas(width, height);
        // p.algorithm.init();
        p.background("#FFFFFF");
        p.frameRate(30);
      };

      p.draw = function() {
        p.clear();
        /* - Draw circle 
        ================================================*/
        p.noStroke();
        for (let i = 0; i < p.points.listBall.length; i++) {
          let c = p.color("#777777"); // Define color 'c'
          p.fill(c); // Use color variable 'c' as fill color
          // noStroke(); // Don't draw a stroke around shapes
          p.circle(
            p.points.listBall[i].x,
            p.points.listBall[i].y,
            p.points.radius
          );
        }
        /*================================================*/
        if (p.algorithm.isrunning()) {
          if (!p.algorithm.stop()) {
            p.algorithm.draw(p);
          } else {
            // draw area convex hull
            p.beginShape();
            let c = p.color("rgba(189, 189, 189, 0.5)");
            p.fill(c);
            p.strokeWeight(0.5);
            p.stroke("#212121");
            p.vertex(p.algorithm.convexHull[0].x, p.algorithm.convexHull[0].y);
            for (let i = 1; i < p.algorithm.convexHull.length; i++) {
              p.vertex(
                p.algorithm.convexHull[i].x,
                p.algorithm.convexHull[i].y
              );
            }
            p.endShape(p.CLOSE);
            // $("#"+id).parent().parent().parent().css("transform", "rotateY(180deg)");
            p.noLoop();
            /*================================================*/
          }
        } else {
          if (p.algorithm.isinit()) {
            p.algorithm.drawInitPhase(p);
          }
        }
      };

      p.refresh = function() {
        $("#" + p.id_skate_holder + " #iteration").text(0);
        $("#" + p.id_skate_holder + " #pointsinconvexhull").text(0);
        $("#" + p.id_skate_holder + " #coveredArea").html(0);
        p.loop();
      };
    }, this.id_skate_holder + "-canvas");
  }
}
