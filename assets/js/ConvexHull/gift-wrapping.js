 import GiftWrapping from './GiftWrapping.js'
  var giftWrapping;
  window.addEventListener('load', function(){
    giftWrapping = new GiftWrapping(16.66, this.document.getElementById('world'), 10)
  })
  
  document.addEventListener('keydown', function(e){
    if (e.keyCode == 37 && !giftWrapping.runAlgorithm){
        console.log(giftWrapping)
        giftWrapping.runConvexHull()
    }
  })
