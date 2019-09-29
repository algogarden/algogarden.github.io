import MyConvexHull from './MyConvexHull.js'

export default class MonotoneChain extends MyConvexHull{
    constructor(sleepTime, cv, r){
        super(sleepTime, cv, r)
    }

    async runConvexHull(){
        this.initBeforeRunAlgorithm()

        this.generateBalls()

        this.listBall.sort(function(a, b){
            if (a.x != b.x)
  	            return a.x - b.x
            else
                return a.y - b.y
        })

        console.log(this.listBall)
    }
}