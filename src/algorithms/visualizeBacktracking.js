function Node(row, col) {
    return document.getElementById(`node-${row}-${col}`)
} // Gets a node from the screen

export default function visualizeBacktracking(moves,solvable) {
    //If the original grid isn't solvable then tell the user and return
    if (!solvable) {
        document.getElementById('Error').innerHTML = 'Duplicate detected. Grid has no solution.'
        return
    }
    else {
        document.getElementById('Error').innerHTML = ''
    }

    //Show all the moves
    for (let i = 0; i < moves.length; i++) {
    
        setTimeout(() => {
            Node(moves[i][0],moves[i][1]).className = 'node-start' //color node about to be changed
        }, 5000*Math.pow(i,0.25)-5000)
        setTimeout(() => {
            Node(moves[i][0],moves[i][1]).value = moves[i][2]
            if (moves[i][2] === 0){
                Node(moves[i][0],moves[i][1]).className = 'node' //color visited nodes
            }
            else {
                Node(moves[i][0],moves[i][1]).className = 'node-finish' //color visited nodes
            }
        }, 5000*Math.pow(i+1,0.25)-5000)
    }

    //check if grid has been solved
    setTimeout(() => {
        let solved = true
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col ++){
                console.log(Node(row,col).value)
                if (Node(row,col).value === '0') {
                    document.getElementById('Error').innerHTML = 'Grid does not have a solution :('
                    solved = false
                    break
                }
            }
        }
        if (solved){
            document.getElementById('Error').innerHTML = 'Grid Solved. Boom.'
        }
    }, 5000*Math.pow(moves.length+1,0.25)-5000)
}