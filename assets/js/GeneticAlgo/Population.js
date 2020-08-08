class Population {
  constructor() {
    this.fitness = 0;
    this.bestGene = null;
    this.bestScore = 0;
    this.matingPool = Array();
    this.averageFitness = 0;
  }

  generatingPhase(numberofGene, mutation, target) {
    this.numberofGene = numberofGene;
    this.genes = Array(this.numberofGene);
    for (let i = 0; i < this.numberofGene; i++) {
      this.genes[i] = new Individual(target.length, mutation);
    }
    this.target = target;
    this.averageFitness = 0;
  }

  evaluatingPhase() {
    this.bestGene == null;
    this.bestScore = 0;
    this.averageFitness = 0;
    for (let i = 0; i < this.numberofGene; i++) {
      if (this.bestGene == null) {
        this.bestGene = this.genes[i];
        this.bestScore = this.genes[i].getFitnessScore(this.target);
      } else {
        if (this.bestScore < this.genes[i].getFitnessScore(this.target)) {
          this.bestScore = this.genes[i].getFitnessScore(this.target);
          this.bestGene = this.genes[i];
        }
      }
      this.averageFitness += this.genes[i].getFitnessScore(this.target);
    }
    this.averageFitness = this.averageFitness / this.numberofGene;
  }

  addToMatingPool() {
    this.matingPool = [];
    for (let i = 0; i < this.numberofGene; i++) {
      let n = 1;
      if (this.bestScore != 0) {
        n = Math.floor((this.genes[i].fitness / this.bestScore) * 100);
      }
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.genes[i]);
      }
    }
  }

  reproduce() {
    if (this.matingPool.length == 0) {
      throw "Mating pool is null";
    } else {
      for (let i = 0; i < this.numberofGene; i++) {
        let left_pos = Math.floor(
          Math.random() * Math.floor(this.matingPool.length)
        ); // Pick a point
        let right_pos = Math.floor(
          Math.random() * Math.floor(this.matingPool.length)
        ); // Pick a point
        let child = new Object();
        child = this.matingPool[left_pos].crossover(this.matingPool[right_pos]);
        child.mutation();
        this.genes[i].gene = child.gene;
      }
    }
  }
  crossover() {
    if (this.matingPool.length == 0) {
      throw "Mating pool is null";
    } else {
      for (let i = 0; i < this.numberofGene; i++) {
        this.genes[i].crossover(this.parent);
      }
    }
  }
}
