function Node(row, col) {
  return document.getElementById(`node-${row}-${col}`)
} // Gets a node from the screen

function NodeVal(row, col) {
  return Number(Node(row, col).value)
}

function pushToScreen(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      Node(row, col).value = grid[row][col]
    }
  }
}

function showErrors() {
  let Error = 0
  let seen = []
  let squareRow = 0
  let squareCol = 0

  //check the rows
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (seen.includes(NodeVal(row, col))) {
        Node(row, col).className = "node-finish"
        Error++
      } else {
        seen.push(NodeVal(row, col))
      }
    }
    seen = []
  }
  //check the columns
  for (let col = 0; col < 9; col++) {
    for (let row = 0; row < 9; row++) {
      if (seen.includes(NodeVal(row, col))) {
        Node(row, col).className = "node-finish"
        Error++
      } else {
        seen.push(NodeVal(row, col))
      }
    }
    seen = []
  }
  //Check the squares
  for (let square = 0; square < 9; square++) {
    for (let row = squareRow; row < 3 + squareRow; row++) {
      for (let col = squareCol; col < 3 + squareCol; col++) {
        if (seen.includes(NodeVal(row, col))) {
          Node(row, col).className = "node-finish"
          Error++
        } else {
          seen.push(NodeVal(row, col))
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

  return Error
}

function clearErrors() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      Node(row, col).className = "node"
    }
  }
}

export default function visualizeGeneticAlgorithm(moves) {
  // console.log(moves)
  //Show all the moves
  // let error = 0
  for (let i = 0; i < moves.length; i++) {
    // console.log(moves[i])
    setTimeout(() => {
      pushToScreen(moves[i])
      clearErrors()
      let error = showErrors()
      document.getElementById("Error").innerHTML = `Generation: ${
        i + 1
      } <br></br> Error: ${error}`
    }, 5000 * Math.log(i + 1))
  }
}
