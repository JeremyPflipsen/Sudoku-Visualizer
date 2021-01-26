function Node(row, col) {
    return document.getElementById(`node-${row}-${col}`)
  } // Gets a node from the screen

  export default function loadGrid (grid) {
    for (let row = 0; row < 9; row++){
        for (let col = 0; col <9; col++){
            Node(row,col).value = grid[row][col]
            Node(row,col).className = 'node'
        }
    }
}