import backtracking from './algorithms/backtracking'
import visualizeBacktracking from './algorithms/visualizeBacktracking.js'
import simulatedAnnealing from "./algorithms/simulatedAnnealing";
import visualizeSimulatedAnnealing from "./algorithms/visualizeSimulatedAnnealing";
import hillClimbing from "./algorithms/hillClimbing";
import geneticAlgorithm from './algorithms/geneticAlgorithm'
import visualizeGeneticAlgorithm from './algorithms/visualizeGeneticAlgorithm'

//This function is bound to App.js so that App may
//call any algorithm and visualize it

export default function visualizeAlgorithm(changeNodeVal) {
    let moves = []
    switch(this.state.selectedAlg) {
      case 0:
        console.log("No algorithm selected!")
        break

      case 1:
        let temp = backtracking(this.state.grid)
        moves = temp.moves
        visualizeBacktracking(moves,temp.solvable)
        break

      case 2:
        moves = hillClimbing(this.state.grid)
        setTimeout(visualizeSimulatedAnnealing(moves,changeNodeVal),1000)
        break
      
      case 3:
        moves = simulatedAnnealing(this.state.grid)
        setTimeout(visualizeSimulatedAnnealing(moves,changeNodeVal),1000)
        break

      case 4:
        moves = geneticAlgorithm(this.state.grid)
        visualizeGeneticAlgorithm(moves)
        break
      
      default:
        console.log("You selected an algorithm!")
        break
    }
}