import QuickHull from './QuickHull.js'
var quickHull;
window.addEventListener('load', function(){
  quickHull = new QuickHull(200, this.document.getElementById('world'), 10)
})

document.addEventListener('keydown', function(e){
  if (e.keyCode == 37 && !quickHull.runAlgorithm){
      quickHull.runConvexHull()
  }
})
