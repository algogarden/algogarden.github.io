
class Board{
    constructor(sleepTime, id_skate_holder,algorithm){
        this.sleepTime=sleepTime;
        var front = document.getElementsByClassName("front");
        this.width = front[0].offsetWidth;
        this.height =front[0].offsetHeight;
        this.id_skate_holder=id_skate_holder;
        this.instance=Singleton.getInstance();
        this.algorithm=algorithm;
    }

    // DrawCanvas(){
    //     clear();
    //     drawCircle();
    //     drawConvexHull()
    //     sleep(timeToSleep);
    // }

    //  sleep (milliseconds) {
    //     return new Promise(resolve => setTimeout(resolve, milliseconds));
    // };

    drawCircle(p) {
        p.noStroke();
       for (let i = 0; i < this.instance.listBall.length; i++){
           let c = p.color("#33cc33"); // Define color 'c'
           p.fill(c); // Use color variable 'c' as fill color
           // noStroke(); // Don't draw a stroke around shapes      
           p.circle(this.instance.listBall[i].x, this.instance.listBall[i].y,this.instance.radius);
       }

       for(let i=0;i<this.algorithm.convexHull.length;i++){
         let c = p.color("#039be5"); // Define color 'c'
         p.fill(c); // Use color variable 'c' as fill color
         p.noStroke(); // Don't draw a stroke around shapes      
         p.circle(this.algorithm.convexHull[i].x, this.algorithm.convexHull[i].y,this.instance.radius);
       }
     };

     drawconvexHull(p) {
      p.beginShape();
      let c= p.color('rgba(179, 229, 252, 0.5)');
      p.fill(c);
      p.strokeWeight(0.5);
      p.stroke("#039be5");
      p.vertex(this.algorithm.convexHull[0].x,this.algorithm.convexHull[0].y);
      for (let i = 1; i < this.algorithm.convexHull.length; i++) {
        p.vertex(this.algorithm.convexHull[i].x, this.algorithm.convexHull[i].y)
      }
      p.vertex(this.algorithm.convexHull[0].x,this.algorithm.convexHull[0].y);
      p.endShape();
   };
   
    
    run(){
      this.algorithm.run();
    }
    init(){
      this.algorithm.init();
    }
    Stop(){
      if(!this.algorithm.stop()){
        this.run();
        return false;
      }
      else return true
    }
}
