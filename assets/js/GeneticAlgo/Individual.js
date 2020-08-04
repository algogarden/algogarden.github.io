class Individual {
  constructor(length, mutationRate) {
    this.chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    this.gene= Array(length);
    for (let i = 0; i < length; i++) {
      this.gene[i] = this.chars.charAt(
        Math.floor(Math.random() * this.chars.length)
      );
    }
    this.mutationRate=mutationRate;
    this.fitness=0;
  }

  mutation() {
    for (let i = 0; i < this.gene.length; i++) {
      if (Math.random() <= this.mutationRate) {
        this.gene[i] = this.chars.charAt(
          Math.floor(Math.random() * this.chars.length)
        );
      }
    }
  }
  getFitnessScore(stadard) {
    this.fitness=0;
    let point = 0;
    for (let i = 0; i < stadard.length; i++) {
      if (this.gene[i] == stadard[i]) {
        point++;
      }
    }
    this.fitness= (point+0.1) / stadard.length;
    return this.fitness;
  }
  
  crossover(target){
    let tmp = new Array(target.gene.length);
    let midpoint = Math.floor(Math.random() * Math.floor(target.gene.length)); // Pick a midpoint
    for (let i = 0; i < target.gene.length; i++) {
      if (i <= midpoint) {
        tmp[i] = this.gene[i];
      } else {
        tmp[i] = target.gene[i];
      }
    }
    this.gene=tmp;
    return this;
  }
}
