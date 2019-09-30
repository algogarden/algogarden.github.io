class Algorithm{

drawCircle(p) {
    p.noStroke();
    // debugger;
   for (let i = 0; i < this.instance.listBall.length; i++){
       let c = p.color("#33cc33"); // Define color 'c'
       p.fill(c); // Use color variable 'c' as fill color
       // noStroke(); // Don't draw a stroke around shapes      
       p.circle(this.instance.listBall[i].x, this.instance.listBall[i].y,this.instance.radius);
   }

   for(let i=0;i<this.convexHull.length;i++){
     let c = p.color("#039be5"); // Define color 'c'
     p.fill(c); // Use color variable 'c' as fill color
     p.noStroke(); // Don't draw a stroke around shapes      
     p.circle(this.convexHull[i].x, this.convexHull[i].y,this.instance.radius);
   }
 };

 drawconvexHull(p) {
  p.beginShape();
  let c= p.color('rgba(179, 229, 252, 0.5)');
  p.fill(c);
  p.strokeWeight(0.5);
  p.stroke("#039be5");
  p.vertex(this.convexHull[0].x,this.convexHull[0].y);
  for (let i = 1; i < this.convexHull.length; i++) {
    p.vertex(this.convexHull[i].x, this.convexHull[i].y)
  }
  p.endShape(p.CLOSE);
};
}