function getImmutableSquares(mutable) {
  let count = 0
  let immutableSquares = []
  let squareRow = 0
  let squareCol = 0

  for (let square = 0; square < 9; square++) {
    for (let row = squareRow; row < 3 + squareRow; row++) {
      for (let col = squareCol; col < 3 + squareCol; col++) {
        if (!mutable[row][col]) {
          count++
        }
      }
    }

    if (count >= 8) {
      immutableSquares.push([squareRow, squareCol])
    }

    count = 0

    if (squareCol !== 6) {
      squareCol = squareCol + 3
    } else {
      squareCol = 0
      squareRow = squareRow + 3
    }
  }

  return immutableSquares
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function randomGrid(grid, mutable) {
  //copy array because pass by reference and setState are fucking dumb
  let tempGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      tempGrid[row][col] = grid[row][col]
    }
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (mutable[row][col]) {
        tempGrid[row][col] = getRandomInt(9) + 1
      }
    }
  }
  return tempGrid
}

function error(grid) {
  let E = 0
  let seen = []
  let squareRow = 0
  let squareCol = 0

  //check the rows
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (seen.includes(grid[row][col])) {
        E = E + 1
      } else {
        seen.push(grid[row][col])
      }
    }
    seen = []
  }
  //check the columns
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      if (seen.includes(grid[row][col])) {
        E = E + 1
      } else {
        seen.push(grid[row][col])
      }
    }
    seen = []
  }
  //Check the squares
  for (let square = 0; square < 9; square++) {
    for (let row = squareRow; row < 3 + squareRow; row++) {
      for (let col = squareCol; col < 3 + squareCol; col++) {
        if (seen.includes(grid[row][col])) {
          E = E + 1
        } else {
          seen.push(grid[row][col])
        }
      }
    }
    if (squareCol !== 6) {
      squareCol = squareCol + 3
    } else {
      squareCol = 0
      squareRow = squareRow + 3
    }

    seen = []
  }

  return E
}

function minimum(array) {
  let min = Infinity
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }
  }
  return min
}

function solve(grid, moves, mutable) {
  //check if any squares have 8 or 9 immutables
  let immutableSquares = getImmutableSquares(mutable)
  if (immutableSquares.length === 9) {
    document.getElementById("Error").innerHTML = "Trivial solution detected."
    return
  }

  //Step 1: initialize population
  let Cpopulation = []
  let N = 1000 //population size

  for (let i = 0; i < N; i++) {
    //create random individual
    Cpopulation.push(randomGrid(grid, mutable))
  }

  let Ngenerations = 1000
  for (let g = 0; g < Ngenerations; g++) {
    //Step 2: Selection
    //Create reproductive population
    let fitness = []
    let Rpopulation = []
    for (let i = 0; i < N; i++) {
      //evaluate error of each individual
      //add individual to reproductive population according to its error
      fitness.push(216 - error(Cpopulation[i])) //Maximum error is 81*3-9*3 = 216
    }
    // console.log(fitness[0])

    // //subtract constant from all fitnesses so that the minimum is 1
    let min = minimum(fitness)
    // console.log(min)
    for (let j = 0; j < fitness.length; j++) {
      fitness[j] = fitness[j] - min + 1
    }

    //make reproductive population based on fitness of individuals
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < fitness[i]; j++) {
        Rpopulation.push(i)
        Rpopulation.push(i)
        Rpopulation.push(i)
      }
    }

    //Step 3: Reproduction
    //create new population from current reproductive population
    let Npopulation = []
    let parent1 = -1
    let parent2 = -1
    for (let i = 0; i < N; i++) {
      //choose two random parents
      parent1 = Rpopulation[getRandomInt(Rpopulation.length)]
      parent2 = Rpopulation[getRandomInt(Rpopulation.length)]
      while (parent2 === parent1) {
        parent2 = Rpopulation[getRandomInt(Rpopulation.length)]
      }

      // mix their info
      let tempGrid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]

      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (mutable[row][col]) {
            if (Math.random() > 0.5) {
              tempGrid[row][col] = Cpopulation[parent1][row][col]
            } else {
              tempGrid[row][col] = Cpopulation[parent2][row][col]
            }
          } else {
            tempGrid[row][col] = grid[row][col]
          }
        }
      }

      // mutate
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (mutable[row][col]) {
            if (Math.random() < 0.01 - 0.00001 * g) {
              tempGrid[row][col] = getRandomInt(9) + 1
            }
          }
        }
      }

      //add new child to new population
      Npopulation.push(tempGrid)
    }

    //Finished making new generation. Set new population to current population and do next generation
    moves.push(Cpopulation[0])
    Cpopulation = Npopulation
  }
}

export default function geneticAlgorithm(grid) {
  let mutable = []

  //Prevents the algorithm from changing original node values
  for (let row = 0; row < 9; row++) {
    let temp = []
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0 || grid[row][col] === "0") {
        temp.push(true)
      } else {
        temp.push(false)
      }
    }
    mutable.push(temp)
  }

  //a list of the moves the algorithm will take
  let moves = []

  solve(grid, moves, mutable)

  return moves
}
