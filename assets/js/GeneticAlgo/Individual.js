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
      if (Math.random() < this.mutationRate) {
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
    this.fitness= point / stadard.length;
    return this.fitness;
  }
  
  crossover(target){
    let child = new Individual(target.gene.length,this.mutation);
    let midpoint = Math.floor(Math.random() * Math.floor(target.gene.length)); // Pick a midpoint
    for (let i = 0; i < target.gene.length; i++) {
      if (i < midpoint) {
        child.gene[i] = this.gene[i];
      } else {
        child.gene[i] = target.gene[i];
      }
    }
    return child;
  }
}
