import MyConvexHull from './MyConvexHull.js'

export default class MonotoneChain extends MyConvexHull{
    constructor(sleepTime, cv, r){
        super(sleepTime, cv, r)
    }

    async runConvexHull(){
        this.initBeforeRunAlgorithm()

        this.generateBalls()

        this.listBall.sort(function(a, b){
            return a.x < b.x || (a.x == b.x && a.y < b.y)
        })

        console.log(this.listBall)
    }
}